import {
  filterProperGears,
  getAdjacentGears,
  getAllGears,
  getNumbersAdjacentToSymbols,
  parseMap,
  sumOfGearRatios,
} from './day03'

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

const map = parseMap(testInput)

describe('getAdjacentGears', () => {
  it('works', () => {
    expect(getAdjacentGears(map, 0, 0, 3)).toEqual(['1:3'])
    expect(getAdjacentGears(map, 3, 0, 3)).toEqual(['4:3'])
    expect(getAdjacentGears(map, 4, 0, 3)).toEqual(['4:3'])
    expect(getAdjacentGears(map, 5, 0, 3)).toEqual(['4:3'])
    expect(getAdjacentGears(map, 7, 6, 9)).toEqual(['8:5'])
    expect(getAdjacentGears(map, 9, 5, 8)).toEqual(['8:5'])
    expect(getAdjacentGears(map, 8, 6, 9)).toEqual(['8:5'])
  })
})

describe('sumOfGearRatios', () => {
  it('sums it', () => {
    expect(sumOfGearRatios(filterProperGears(getAllGears(map)))).toBe(467835)
  })
})
