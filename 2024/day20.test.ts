import { colorize } from '../colors'
import { findPath, getCheatsOver, Grid, parseGrid, State } from './day20'

const testInput = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`

// describe('Day20', () => {
//   it('works for test input', () => {
//     const [grid, start, finish] = parseGrid(testInput)
//     const path = findPath(grid, start, finish)

//     printGrid(grid, path)
//   })
// })

describe('getCheatsOver', () => {
  it('works for test input', () => {
    const parsed = parseGrid(testInput)
    expect(getCheatsOver(10, ...parsed)).toBe(10)
    expect(getCheatsOver(20, ...parsed)).toBe(5)
    expect(getCheatsOver(40, ...parsed)).toBe(2)
    expect(getCheatsOver(64, ...parsed)).toBe(1)
  })
})

function printGrid(grid: Grid, endNode?: State) {
  const copy: string[][] = grid.map(r => [...r])

  const path = endNode ? [endNode] : []
  while (endNode?.prev) {
    endNode = endNode.prev
    path.push(endNode)
  }

  for (let node of path) {
    copy[node.pos.y][node.pos.x] = colorize('O', 'Green')
  }

  console.log(
    copy
      .map(r => r.join(''))
      .join('\n')
      .replace(/\./g, colorize('.', 'Gray'))
      .replace(/#/g, colorize('#', 'BgWhite'))
  )
}
