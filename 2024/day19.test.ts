import {
  getCombinations,
  getCombinationSum,
  getPossibleCount,
  isPossible,
  parseTowels,
} from './day19'

const testInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`

// describe('Day19', () => {
//   it('works for test input', () => {
//     expect(getPossibleCount(...parseTowels(testInput))).toBe(6)
//   })
// })

describe('getCombinationSum', () => {
  it('does stuff', () => {
    const [, patterns] = parseTowels(testInput)
    expect(getCombinations('brwrr', patterns).size).toBe(2)
    expect(getCombinations('bggr', patterns).size).toBe(1)
    expect(getCombinations('gbbr', patterns).size).toBe(4)
    expect(getCombinations('rrbgbr', patterns).size).toBe(6)
    expect(getCombinations('ubwu', patterns).size).toBe(0)
  })
})

describe('getCombinationSum', () => {
  it('works for test input', () => {
    expect(getCombinationSum(...parseTowels(testInput))).toBe(16)
  })
})
