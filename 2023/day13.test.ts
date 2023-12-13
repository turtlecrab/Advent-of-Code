import { findSymmetry, getSum, parsePatterns } from './day13'

const testInput = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`

describe('findSymmetry', () => {
  it('does stuff', () => {
    const patterns = parsePatterns(testInput)
    expect(findSymmetry(patterns[0])).toEqual({ type: '|', index: 5 })
    expect(findSymmetry(patterns[1])).toEqual({ type: '-', index: 4 })
  })
})

describe('getSum', () => {
  it('gets it', () => {
    expect(getSum(parsePatterns(testInput))).toBe(405)
  })
})
