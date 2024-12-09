import { getAntinodeCount, getAntinodeCount2, parseMap } from './day08'

const testInput = `
............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`.trim()

describe('getAntinodeCount', () => {
  it('works for test input', () => {
    expect(getAntinodeCount(parseMap(testInput))).toBe(14)
  })
})

describe('getAntinodeCount2', () => {
  it('works for test input', () => {
    expect(getAntinodeCount2(parseMap(testInput))).toBe(34)
  })
})