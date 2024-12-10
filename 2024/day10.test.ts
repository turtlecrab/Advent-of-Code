import { getScoreSum, parseGrid } from './day10'

const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`

describe('getScoreSum', () => {
  it('works for test input', () => {
    expect(getScoreSum(...parseGrid(testInput))).toBe(36)
  })
})
