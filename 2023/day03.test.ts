import { getNumbersAdjacentToSymbols, parseMap } from './day03'

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

describe('getNumbersAdjacentToSymbols', () => {
  it('works', () => {
    const nums = getNumbersAdjacentToSymbols(parseMap(testInput))
    expect(nums.reduce((a, c) => a + c)).toBe(4361)
  })
})
