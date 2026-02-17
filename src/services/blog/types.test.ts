import { describe, it, expect } from 'vitest'

import { isBlogFrontMatter } from './types'

describe('isBlogFrontMatter', () => {
  const validFrontMatter = {
    title: 'Test Blog Post',
    description: 'This is a test description',
    date: '2024-01-01',
    category: 'tech',
    tags: ['react', 'next'],
    image: '/images/test.png',
    alt: 'Test image',
  }

  it('有効なfrontmatterを認可', () => {
    expect(isBlogFrontMatter(validFrontMatter)).toBe(true)
  })

  it('nullを拒否', () => {
    expect(isBlogFrontMatter(null)).toBe(false)
  })

  it('undefinedを拒否', () => {
    expect(isBlogFrontMatter(undefined)).toBe(false)
  })

  it('プリミティブ値を拒否', () => {
    expect(isBlogFrontMatter('string')).toBe(false)
    expect(isBlogFrontMatter(123)).toBe(false)
    expect(isBlogFrontMatter(true)).toBe(false)
  })

  it('空オブジェクトを拒否', () => {
    expect(isBlogFrontMatter({})).toBe(false)
  })

  it('titleが欠けている場合を拒否', () => {
    const { title: _title, ...rest } = validFrontMatter
    expect(isBlogFrontMatter(rest)).toBe(false)
  })

  it('titleが文字列でない場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, title: 123 })).toBe(false)
  })

  it('descriptionが欠けている場合を拒否', () => {
    const { description: _description, ...rest } = validFrontMatter
    expect(isBlogFrontMatter(rest)).toBe(false)
  })

  it('descriptionが文字列でない場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, description: 123 })).toBe(false)
  })

  it('dateが欠けている場合を拒否', () => {
    const { date: _date, ...rest } = validFrontMatter
    expect(isBlogFrontMatter(rest)).toBe(false)
  })

  it('dateが文字列でない場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, date: 123 })).toBe(false)
  })

  it('dateが無効な日付文字列の場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, date: 'invalid-date' })).toBe(false)
  })

  it('categoryが欠けている場合を拒否', () => {
    const { category: _category, ...rest } = validFrontMatter
    expect(isBlogFrontMatter(rest)).toBe(false)
  })

  it('categoryが無効な値の場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, category: 'invalid-category' })).toBe(false)
  })

  it('全てのカテゴリーを認可', () => {
    const validCategories = [
      'diary',
      'made',
      'poem',
      'house',
      'gadget',
      'pc-build',
      'game',
      'anime',
      'book',
      'vr',
      'tech',
      'hair-removal',
    ]

    validCategories.forEach((category) => {
      expect(isBlogFrontMatter({ ...validFrontMatter, category })).toBe(true)
    })
  })

  it('tagsが欠けている場合を拒否', () => {
    const { tags: _tags, ...rest } = validFrontMatter
    expect(isBlogFrontMatter(rest)).toBe(false)
  })

  it('tagsが配列でない場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, tags: 'react' })).toBe(false)
  })

  it('tagsに無効なタグが含まれる場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, tags: ['react', 'invalid-tag'] })).toBe(false)
  })

  it('tagsが空配列の場合を認可', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, tags: [] })).toBe(true)
  })

  it('imageが欠けている場合を拒否', () => {
    const { image: _image, ...rest } = validFrontMatter
    expect(isBlogFrontMatter(rest)).toBe(false)
  })

  it('imageが文字列でない場合を拒否', () => {
    expect(isBlogFrontMatter({ ...validFrontMatter, image: 123 })).toBe(false)
  })

  it('altフィールドは検証されない（オプショナル）', () => {
    const { alt: _alt, ...rest } = validFrontMatter
    // altがなくても他が正しければtrue
    expect(isBlogFrontMatter(rest)).toBe(true)
  })

  it('余分なフィールドがあっても認可', () => {
    const withExtraFields = {
      ...validFrontMatter,
      extraField: 'extra value',
      anotherField: 123,
    }
    expect(isBlogFrontMatter(withExtraFields)).toBe(true)
  })
})
