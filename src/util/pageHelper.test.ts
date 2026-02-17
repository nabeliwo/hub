import { describe, it, expect } from 'vitest'

import { path } from '@/constants/path'

import { paginate, range, matchNavItem } from './pageHelper'

describe('paginate', () => {
  const items = Array.from({ length: 50 }, (_, i) => `item-${i}`)

  it('最初のページを取得', () => {
    const result = paginate(items, '1')
    expect(result.items).toHaveLength(20)
    expect(result.items[0]).toBe('item-0')
    expect(result.currentPage).toBe(1)
    expect(result.totalPages).toBe(3)
    expect(result.error).toBe(false)
  })

  it('2ページ目を取得', () => {
    const result = paginate(items, '2')
    expect(result.items).toHaveLength(20)
    expect(result.items[0]).toBe('item-20')
    expect(result.currentPage).toBe(2)
    expect(result.totalPages).toBe(3)
    expect(result.error).toBe(false)
  })

  it('最後のページを取得（アイテム数が20の倍数でない）', () => {
    const result = paginate(items, '3')
    expect(result.items).toHaveLength(10)
    expect(result.items[0]).toBe('item-40')
    expect(result.currentPage).toBe(3)
    expect(result.totalPages).toBe(3)
    expect(result.error).toBe(false)
  })

  it('無効なページ番号を処理', () => {
    const result = paginate(items, 'invalid')
    expect(result.items).toHaveLength(0)
    expect(result.totalPages).toBe(0)
    expect(result.currentPage).toBe(0)
    expect(result.error).toBe(true)
  })

  it('範囲外のページを最後のページにクリップ', () => {
    const result = paginate(items, '999')
    expect(result.currentPage).toBe(3)
    expect(result.items).toHaveLength(10)
    expect(result.error).toBe(false)
  })

  it('0ページはそのまま0を返す', () => {
    const result = paginate(items, '0')
    expect(result.currentPage).toBe(0)
    expect(result.items).toHaveLength(0)
    expect(result.error).toBe(false)
  })

  it('負のページ番号はそのまま負の値を返す（slice動作により配列の後方を取得）', () => {
    const result = paginate(items, '-1')
    expect(result.currentPage).toBe(-1)
    // slice(-40, -20)となるため、配列の後方から取得される
    expect(result.items).toHaveLength(20)
    expect(result.error).toBe(false)
  })

  it('ページパラメータが未指定の場合は1ページ目を返す', () => {
    const result = paginate(items)
    expect(result.currentPage).toBe(1)
    expect(result.items[0]).toBe('item-0')
    expect(result.error).toBe(false)
  })

  it('空配列を処理', () => {
    const result = paginate([], '1')
    expect(result.items).toHaveLength(0)
    expect(result.totalPages).toBe(0)
    expect(result.currentPage).toBe(0)
    expect(result.error).toBe(false)
  })

  it('20アイテム未満の場合は1ページに収まる', () => {
    const smallItems = Array.from({ length: 15 }, (_, i) => `item-${i}`)
    const result = paginate(smallItems, '1')
    expect(result.items).toHaveLength(15)
    expect(result.totalPages).toBe(1)
    expect(result.currentPage).toBe(1)
    expect(result.error).toBe(false)
  })
})

describe('range', () => {
  it('正常な範囲を生成', () => {
    expect(range(1, 5)).toEqual([1, 2, 3, 4, 5])
  })

  it('単一値の範囲を生成', () => {
    expect(range(3, 3)).toEqual([3])
  })

  it('大きな範囲を生成', () => {
    const result = range(1, 100)
    expect(result).toHaveLength(100)
    expect(result[0]).toBe(1)
    expect(result[99]).toBe(100)
  })

  it('0を含む範囲を生成', () => {
    expect(range(0, 3)).toEqual([0, 1, 2, 3])
  })

  it('負の数を含む範囲を生成', () => {
    expect(range(-2, 2)).toEqual([-2, -1, 0, 1, 2])
  })
})

describe('matchNavItem', () => {
  it('About Meページは完全一致のみ', () => {
    expect(matchNavItem(path.aboutMe, '/')).toBe(true)
    expect(matchNavItem(path.aboutMe, '/blog')).toBe(false)
    expect(matchNavItem(path.aboutMe, '/weekly')).toBe(false)
  })

  it('Blogページはプレフィックスマッチ', () => {
    expect(matchNavItem(path.blog, '/blog')).toBe(true)
    expect(matchNavItem(path.blog, '/blog/page/2')).toBe(true)
    expect(matchNavItem(path.blog, '/blog/article/test')).toBe(true)
    expect(matchNavItem(path.blog, '/weekly')).toBe(false)
    expect(matchNavItem(path.blog, '/')).toBe(false)
  })

  it('Weeklyページはプレフィックスマッチ', () => {
    expect(matchNavItem(path.weekly, '/weekly')).toBe(true)
    expect(matchNavItem(path.weekly, '/weekly/page/2')).toBe(true)
    expect(matchNavItem(path.weekly, '/weekly/article/test')).toBe(true)
    expect(matchNavItem(path.weekly, '/blog')).toBe(false)
  })

  it('Best Buyページはプレフィックスマッチ', () => {
    expect(matchNavItem(path.bestBuy, '/best-buy')).toBe(true)
    expect(matchNavItem(path.bestBuy, '/best-buy/page/2')).toBe(true)
    expect(matchNavItem(path.bestBuy, '/blog')).toBe(false)
  })
})
