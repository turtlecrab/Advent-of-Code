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

describe('getAreasTotalPrice part 2', () => {
  it('works for test input', () => {
    expect(getAreasTotalPrice(getAreas(parseGrid(testInput)), true)).toBe(1206)
  })
})
