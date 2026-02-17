import { describe, it, expect } from 'vitest'

import { countItems } from './logic'

describe('countItems', () => {
  it('アイテムの出現回数をカウント', () => {
    const items = ['react', 'next', 'react', 'react', 'next', 'ts']
    const result = countItems(items)

    expect(result).toEqual({
      react: 3,
      next: 2,
      ts: 1,
    })
  })

  it('空配列を処理', () => {
    const result = countItems([])
    expect(result).toEqual({})
  })

  it('単一アイテムを処理', () => {
    const result = countItems(['react'])
    expect(result).toEqual({
      react: 1,
    })
  })

  it('すべて同じアイテムの配列を処理', () => {
    const result = countItems(['react', 'react', 'react'])
    expect(result).toEqual({
      react: 3,
    })
  })

  it('すべて異なるアイテムの配列を処理', () => {
    const result = countItems(['react', 'next', 'ts', 'node'])
    expect(result).toEqual({
      react: 1,
      next: 1,
      ts: 1,
      node: 1,
    })
  })

  it('大量のアイテムを処理', () => {
    const items = Array(100).fill('react').concat(Array(50).fill('next'))
    const result = countItems(items)

    expect(result).toEqual({
      react: 100,
      next: 50,
    })
  })
})
