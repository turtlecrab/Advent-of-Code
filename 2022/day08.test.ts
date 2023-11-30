import {
  getHighestScenicScore,
  getScenicScore,
  getVisibleAmount,
  getVisibleInLine,
  isVisible,
  parseMap,
} from './day08'

const testInput = `30373
25512
65332
33549
35390`

describe('parseMap', () => {
  it('parses the map', () => {
    expect(parseMap(testInput)).toHaveLength(5)
    expect(parseMap(testInput)[1][3]).toBe(1)
  })
})

describe('isVisible', () => {
  const map = parseMap(testInput)

  it('returns true for the edges', () => {
    expect(isVisible(map, 0, 0)).toBe(true)
    expect(isVisible(map, 3, 4)).toBe(true)
  })
  it('works for the middle', () => {
    expect(isVisible(map, 1, 1)).toBe(true)
    expect(isVisible(map, 1, 2)).toBe(true)
    expect(isVisible(map, 1, 3)).toBe(false)
    expect(isVisible(map, 2, 1)).toBe(true)
    expect(isVisible(map, 2, 2)).toBe(false)
    expect(isVisible(map, 2, 3)).toBe(true)
    expect(isVisible(map, 3, 1)).toBe(false)
    expect(isVisible(map, 3, 2)).toBe(true)
    expect(isVisible(map, 3, 3)).toBe(false)
  })
})

describe('getVisibleAmount', () => {
  it('gets the visible amount', () => {
    expect(getVisibleAmount(parseMap(testInput))).toBe(21)
  })
})

describe('getHighestScenicScore', () => {
  it('gets amount of visible trees in line', () => {
    expect(getVisibleInLine([], 5)).toBe(0)
    expect(getVisibleInLine([3], 5)).toBe(1)
    expect(getVisibleInLine([5, 2], 5)).toBe(1)
    expect(getVisibleInLine([3, 5, 3], 5)).toBe(2)
    expect(getVisibleInLine([1, 2], 5)).toBe(2)
  })
  it('gets scenic score', () => {
    expect(getScenicScore(parseMap(testInput), 1, 2)).toBe(4)
  })
  it('gets highest scenic score', () => {
    expect(getHighestScenicScore(parseMap(testInput))).toBe(8)
  })
})
