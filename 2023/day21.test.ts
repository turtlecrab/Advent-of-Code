import { getEvenVisitedCount, parseMap, play } from './day21'

const testInput = `
...........
.....###.#.
.###.##..#.
..#.#...#..
....#.#....
.##..S####.
.##..#...#.
.......##..
.##.#.####.
.##..##.##.
...........`.trim()

const testResult = `
...........
.....###.#.
.###.##.O#.
.O#O#O.O#..
O.O.#.#.O..
.##O.O####.
.##.O#O..#.
.O.O.O.##..
.##.#.####.
.##O.##.##.
...........`.trim()

describe('parseMap', () => {
  it('parses', () => {
    const [grid, start] = parseMap(testInput)
    expect(start).toEqual({ x: 5, y: 5 })
    expect(grid[5].join('')).toBe('.##...####.')
  })
})

describe('play', () => {
  it('plays', () => {
    const [grid, start] = parseMap(testInput)
    const visited = play(grid, start, 6)

    const copy: string[][] = grid.map(row => [...row])

    for (let [key, steps] of visited) {
      if (steps % 2 !== 0) continue

      const [y, x] = key.split(':').map(Number)
      copy[y][x] = 'O'
    }
    expect(copy.map(row => row.join('')).join('\n')).toBe(testResult)
  })
})

describe('getEvenVisitedCount', () => {
  it('does stuff', () => {
    const [grid, start] = parseMap(testInput)
    const visited = play(grid, start, 6)
    expect(getEvenVisitedCount(visited)).toBe(16)
  })
})
