import { getPossibleCount, isPossible, parseTowels } from './day19'

const testInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

describe('Day19', () => {
  it('works for test input', () => {
    expect(getPossibleCount(...parseTowels(testInput))).toBe(6)
  })
})
