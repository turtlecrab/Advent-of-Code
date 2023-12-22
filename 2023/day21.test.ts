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

    expect(getEvenVisitedCount(play(grid, start, 6))).toBe(16)
    expect(getEvenVisitedCount(play(grid, start, 10))).toBe(50)
    expect(getEvenVisitedCount(play(grid, start, 50))).toBe(1594)
    // expect(getEvenVisitedCount(play(grid, start, 100))).toBe(6536)
    // expect(getEvenVisitedCount(play(grid, start, 1000))).toBe(668697)
    // expect(getEvenVisitedCount(play(grid, start, 5000))).toBe(16733044)
  })
})
