import {
  getCombinationsAmount,
  getPossibleArrangements,
  getSumOfCombinations,
  isMatching,
  parseSprings,
} from './day12'

const testInput = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`

describe('parseSprings', () => {
  it('parses', () => {
    const springs = parseSprings(testInput)
    expect(springs.length).toBe(6)
    expect(springs[3].pattern).toBe('????.#...#...')
    expect(springs[3].groups).toEqual([4, 1, 1])
  })
})

describe('getPossibleArrangements', () => {
  const springs = parseSprings(testInput)

  it('works for 1 possible arrangements', () => {
    const { groups, pattern } = springs[0]
    expect(getPossibleArrangements(groups, pattern.length)).toEqual(['#.#.###'])
    expect(getPossibleArrangements([1], 1)).toEqual(['#'])
    expect(getPossibleArrangements([2], 2)).toEqual(['##'])
    expect(getPossibleArrangements([1, 1], 3)).toEqual(['#.#'])
  })
  it('works for 1 group', () => {
    expect(getPossibleArrangements([1], 2)).toEqual(['#.', '.#'])
    expect(getPossibleArrangements([1], 3)).toEqual(['#..', '.#.', '..#'])
    expect(getPossibleArrangements([2], 3)).toEqual(['##.', '.##'])
    expect(getPossibleArrangements([2], 4)).toEqual(['##..', '.##.', '..##'])
  })
  it('works for 2 groups', () => {
    expect(getPossibleArrangements([1, 1], 4)).toEqual(['#.#.', '#..#', '.#.#'])
    expect(getPossibleArrangements([1, 1], 5)).toEqual([
      '#.#..',
      '#..#.',
      '#...#',
      '.#.#.',
      '.#..#',
      '..#.#',
    ])
    expect(getPossibleArrangements([1, 6], 16)).toBeTruthy()
  })
  it('works for 3 groups', () => {
    expect(getPossibleArrangements([1, 1, 1], 5)).toEqual(['#.#.#'])
    expect(getPossibleArrangements([1, 2, 1], 6)).toEqual(['#.##.#'])
    expect(getPossibleArrangements([2, 1, 6], 16)).toBeTruthy()
  })
  it('works for 4 groups', () => {
    expect(getPossibleArrangements([1, 3, 1, 6], 16)).toBeTruthy()
    expect(getPossibleArrangements([1, 2, 1], 6)).toEqual(['#.##.#'])
  })
})

describe('isMatching', () => {
  it('matches', () => {
    expect(isMatching('#.#.###', '???.###')).toBe(true)
    expect(isMatching('.#..###', '???.###')).toBe(true)
    expect(isMatching('.....##', '???.###')).toBe(false)
    expect(isMatching('...####', '???.###')).toBe(false)
    expect(isMatching('.....##', '???.?##')).toBe(true)
  })
})

describe('getCombinationsAmount', () => {
  it('gets it', () => {
    const springs = parseSprings(testInput)
    expect(getCombinationsAmount(springs[0])).toBe(1)
    expect(getCombinationsAmount(springs[1])).toBe(4)
    expect(getCombinationsAmount(springs[2])).toBe(1)
    expect(getCombinationsAmount(springs[3])).toBe(1)
    expect(getCombinationsAmount(springs[4])).toBe(4)
    expect(getCombinationsAmount(springs[5])).toBe(10)
  })
})

describe('getSumOfCombinations', () => {
  it('gets it', () => {
    expect(getSumOfCombinations(parseSprings(testInput))).toBe(21)
  })
})
