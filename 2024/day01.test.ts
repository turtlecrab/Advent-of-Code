import {
  parseLists,
  getSortedDifferenceSum,
  getSimilarityScoreSum,
} from './day01'

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`

describe('getSortedDifferenceSum', () => {
  it('works for test input', () => {
    expect(getSortedDifferenceSum(...parseLists(testInput))).toBe(11)
  })
})

describe('getSimilarityScoreSum', () => {
  it('works for test input', () => {
    expect(getSimilarityScoreSum(...parseLists(testInput))).toBe(31)
  })
})
