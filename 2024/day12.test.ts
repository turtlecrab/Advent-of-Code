import { getAreas, getAreasTotalPrice, parseGrid } from './day12'

const testInput = `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`

describe('getAreasTotalPrice', () => {
  it('works for test input', () => {
    expect(getAreasTotalPrice(getAreas(parseGrid(testInput)))).toBe(1930)
  })
})
