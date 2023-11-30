import { isContaining, isOverlapping } from './day04'

describe('isContaining', () => {
  it('passes provided tests ', () => {
    expect(isContaining('2-4,6-8')).toBe(false)
    expect(isContaining('2-3,4-5')).toBe(false)
    expect(isContaining('5-7,7-9')).toBe(false)
    expect(isContaining('2-8,3-7')).toBe(true)
    expect(isContaining('6-6,4-6')).toBe(true)
    expect(isContaining('2-6,4-8')).toBe(false)
  })
})

describe('isOverlapping', () => {
  it('passes provided tests', () => {
    expect(isOverlapping('2-4,6-8')).toBe(false)
    expect(isOverlapping('2-3,4-5')).toBe(false)
    expect(isOverlapping('5-7,7-9')).toBe(true)
    expect(isOverlapping('2-8,3-7')).toBe(true)
    expect(isOverlapping('6-6,4-6')).toBe(true)
    expect(isOverlapping('2-6,4-8')).toBe(true)
  })
})
