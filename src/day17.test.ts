import { getEmptyRowsCount, getTowerHeight } from './day17'

const testInput = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>'

describe('getEmptyRowsCount', () => {
  it('gets the count', () => {
    const map = [[1, 1, 1, 1, 1]]
    expect(getEmptyRowsCount(map)).toBe(0)
    const map2 = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
    ]
    expect(getEmptyRowsCount(map2)).toBe(1)
    const map3 = [
      [1, 1, 1, 1, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 2, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
      [1, 0, 0, 0, 1],
    ]
    expect(getEmptyRowsCount(map3)).toBe(4)
  })
})

describe('getTowerHeight', () => {
  it('gets height', () => {
    expect(getTowerHeight(testInput)).toBe(3068)
  })
})
