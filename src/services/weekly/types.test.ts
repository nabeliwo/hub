import { describe, it, expect } from 'vitest'

import { isWeeklyFrontMatter } from './types'

describe('isWeeklyFrontMatter', () => {
  const validFrontMatter = {
    title: 'Weekly #1',
    description: 'This is a weekly post',
  }

  it('有効なfrontmatterを認可', () => {
    expect(isWeeklyFrontMatter(validFrontMatter)).toBe(true)
  })

  it('nullを拒否', () => {
    expect(isWeeklyFrontMatter(null)).toBe(false)
  })

  it('undefinedを拒否', () => {
    expect(isWeeklyFrontMatter(undefined)).toBe(false)
  })

  it('プリミティブ値を拒否', () => {
    expect(isWeeklyFrontMatter('string')).toBe(false)
    expect(isWeeklyFrontMatter(123)).toBe(false)
    expect(isWeeklyFrontMatter(true)).toBe(false)
  })

  it('空オブジェクトを拒否', () => {
    expect(isWeeklyFrontMatter({})).toBe(false)
  })

  it('titleが欠けている場合を拒否', () => {
    const { title: _title, ...rest } = validFrontMatter
    expect(isWeeklyFrontMatter(rest)).toBe(false)
  })

  it('titleが文字列でない場合を拒否', () => {
    expect(isWeeklyFrontMatter({ ...validFrontMatter, title: 123 })).toBe(false)
  })

  it('descriptionが欠けている場合を拒否', () => {
    const { description: _description, ...rest } = validFrontMatter
    expect(isWeeklyFrontMatter(rest)).toBe(false)
  })

  it('descriptionが文字列でない場合を拒否', () => {
    expect(isWeeklyFrontMatter({ ...validFrontMatter, description: 123 })).toBe(false)
  })

  it('余分なフィールドがあっても認可', () => {
    const withExtraFields = {
      ...validFrontMatter,
      extraField: 'extra value',
      anotherField: 123,
    }
    expect(isWeeklyFrontMatter(withExtraFields)).toBe(true)
  })
})
