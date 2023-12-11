import { getSumOfStarLengths } from './day11'

const testInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`

describe('getSumOfLengths', () => {
  it('gets it', () => {
    expect(getSumOfStarLengths(testInput)).toBe(374)
    expect(getSumOfStarLengths(testInput, 10)).toBe(1030)
    expect(getSumOfStarLengths(testInput, 100)).toBe(8410)
  })
})
