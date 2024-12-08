import {
  getPossibleLoopsCount,
  getVisitedPositionCount,
  parseState,
} from './day06'

const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`

describe('getVisitedPositionCount', () => {
  it('works for test input', () => {
    expect(getVisitedPositionCount(parseState(testInput))).toBe(41)
  })
})

describe('getPossibleLoopsCount', () => {
  it('works for test input', () => {
    expect(getPossibleLoopsCount(parseState(testInput))).toBe(6)
  })
})
