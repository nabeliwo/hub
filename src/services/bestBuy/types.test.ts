import { describe, it, expect } from 'vitest'

import { isBestBuyFrontMatter } from './types'

describe('isBestBuyFrontMatter', () => {
  const validFrontMatter = {
    title: 'MacBook Pro',
    date: '2024-01-01',
    image: '/images/macbook.png',
    alt: 'MacBook Pro',
  }

  it('有効なfrontmatterを認可', () => {
    expect(isBestBuyFrontMatter(validFrontMatter)).toBe(true)
  })

  it('nullを拒否', () => {
    expect(isBestBuyFrontMatter(null)).toBe(false)
  })

  it('undefinedを拒否', () => {
    expect(isBestBuyFrontMatter(undefined)).toBe(false)
  })

  it('プリミティブ値を拒否', () => {
    expect(isBestBuyFrontMatter('string')).toBe(false)
    expect(isBestBuyFrontMatter(123)).toBe(false)
    expect(isBestBuyFrontMatter(true)).toBe(false)
  })

  it('空オブジェクトを拒否', () => {
    expect(isBestBuyFrontMatter({})).toBe(false)
  })

  it('titleが欠けている場合を拒否', () => {
    const { title: _title, ...rest } = validFrontMatter
    expect(isBestBuyFrontMatter(rest)).toBe(false)
  })

  it('titleが文字列でない場合を拒否', () => {
    expect(isBestBuyFrontMatter({ ...validFrontMatter, title: 123 })).toBe(false)
  })

  it('dateが欠けている場合を拒否', () => {
    const { date: _date, ...rest } = validFrontMatter
    expect(isBestBuyFrontMatter(rest)).toBe(false)
  })

  it('dateが文字列でない場合を拒否', () => {
    expect(isBestBuyFrontMatter({ ...validFrontMatter, date: 123 })).toBe(false)
  })

  it('dateが無効な日付文字列の場合を拒否', () => {
    expect(isBestBuyFrontMatter({ ...validFrontMatter, date: 'invalid-date' })).toBe(false)
  })

  it('imageが欠けている場合を拒否', () => {
    const { image: _image, ...rest } = validFrontMatter
    expect(isBestBuyFrontMatter(rest)).toBe(false)
  })

  it('imageが文字列でない場合を拒否', () => {
    expect(isBestBuyFrontMatter({ ...validFrontMatter, image: 123 })).toBe(false)
  })

  it('altフィールドは検証されない（オプショナル）', () => {
    const { alt: _alt, ...rest } = validFrontMatter
    expect(isBestBuyFrontMatter(rest)).toBe(true)
  })

  it('余分なフィールドがあっても認可', () => {
    const withExtraFields = {
      ...validFrontMatter,
      extraField: 'extra value',
      anotherField: 123,
    }
    expect(isBestBuyFrontMatter(withExtraFields)).toBe(true)
  })
})
