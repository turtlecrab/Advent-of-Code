import { getLowestScore, parseGrid } from './day16'

const testInput = `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`

describe('getLowestScore', () => {
  it('works for test input', () => {
    expect(getLowestScore(...parseGrid(testInput))).toBe(7036)
  })
})
