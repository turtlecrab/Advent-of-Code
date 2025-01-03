import { getLowestScore, getVisitedTilesCount, parseGrid } from './day16'

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

const testInput2 = `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`

describe('getLowestScore', () => {
  it('works for test input', () => {
    expect(getLowestScore(...parseGrid(testInput))).toBe(7036)
    expect(getLowestScore(...parseGrid(testInput2))).toBe(11048)
  })
})

describe('getVisitedTilesCount', () => {
  it('works for test input', () => {
    expect(getVisitedTilesCount(...parseGrid(testInput))).toBe(45)
    expect(getVisitedTilesCount(...parseGrid(testInput2))).toBe(64)
  })
})
