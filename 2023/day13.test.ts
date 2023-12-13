import {
  findSmudgedSymmetry,
  findSymmetry,
  getDiff,
  getSum,
  parsePatterns,
} from './day13'

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
  it('finds it', () => {
    const patterns = parsePatterns(testInput)
    expect(findSymmetry(patterns[0])).toEqual({ type: '|', index: 5 })
    expect(findSymmetry(patterns[1])).toEqual({ type: '-', index: 4 })
  })
})

describe('getDiff', () => {
  it('gets amount of different chars', () => {
    expect(getDiff('.........', '#########')).toBe(9)
    expect(getDiff('#####.##.', '#####.##.')).toBe(0)
    expect(getDiff('#.##..##.', '..##..##.')).toBe(1)
  })
})

describe('findSmudgedSymmetry', () => {
  it('finds it', () => {
    const patterns = parsePatterns(testInput)
    expect(findSmudgedSymmetry(patterns[0])).toEqual({ type: '-', index: 3 })
    expect(findSmudgedSymmetry(patterns[1])).toEqual({ type: '-', index: 1 })
  })
})

describe('getSum', () => {
  it('gets it', () => {
    expect(getSum(parsePatterns(testInput))).toBe(405)
    expect(getSum(parsePatterns(testInput), true)).toBe(400)
  })
})
