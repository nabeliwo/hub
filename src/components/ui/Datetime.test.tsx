import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { Datetime } from './Datetime'

describe('Datetime', () => {
  it('デフォルトフォーマット（yyyy-MM-dd）で日付を表示', () => {
    const { container } = render(<Datetime>2024-01-15</Datetime>)
    const timeElement = container.querySelector('time')

    expect(timeElement).toBeTruthy()
    expect(timeElement?.textContent).toBe('2024-01-15')
    expect(timeElement?.getAttribute('dateTime')).toBe('2024-01-15')
  })

  it('カスタムフォーマットで日付を表示', () => {
    const { container } = render(<Datetime formatString="yyyy/MM/dd">2024-01-15</Datetime>)
    const timeElement = container.querySelector('time')

    expect(timeElement).toBeTruthy()
    expect(timeElement?.textContent).toBe('2024/01/15')
    expect(timeElement?.getAttribute('dateTime')).toBe('2024-01-15')
  })

  it('日本語フォーマットで日付を表示', () => {
    const { container } = render(<Datetime formatString="yyyy年MM月dd日">2024-01-15</Datetime>)
    const timeElement = container.querySelector('time')

    expect(timeElement?.textContent).toBe('2024年01月15日')
  })

  it('月と日のみのフォーマット', () => {
    const { container } = render(<Datetime formatString="MM/dd">2024-01-15</Datetime>)
    const timeElement = container.querySelector('time')

    expect(timeElement?.textContent).toBe('01/15')
    expect(timeElement?.getAttribute('dateTime')).toBe('2024-01-15')
  })

  it('time要素のdateTime属性は常にyyyy-MM-dd形式', () => {
    const { container } = render(<Datetime formatString="yyyy年MM月dd日">2024-12-31</Datetime>)
    const timeElement = container.querySelector('time')

    expect(timeElement?.getAttribute('dateTime')).toBe('2024-12-31')
    expect(timeElement?.textContent).toBe('2024年12月31日')
  })

  it('ISO 8601形式の日付文字列を処理', () => {
    const { container } = render(<Datetime>2024-01-15T10:30:00.000Z</Datetime>)
    const timeElement = container.querySelector('time')

    expect(timeElement?.getAttribute('dateTime')).toBe('2024-01-15')
  })
})
