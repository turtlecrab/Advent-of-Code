import {
  getCombinationsAmount,
  getPossibleArrangementsAmount,
  getSumOfCombinations,
  isMatching,
  parseSprings,
  unfoldSprings,
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

describe('isMatching', () => {
  it('matches', () => {
    expect(isMatching('#.#.###', '???.###')).toBe(true)
    expect(isMatching('.#..###', '???.###')).toBe(true)
    expect(isMatching('.....##', '???.###')).toBe(false)
    expect(isMatching('...####', '???.###')).toBe(false)
    expect(isMatching('.....##', '???.?##')).toBe(true)
  })
})

describe('getPossibleArrangementsAmount', () => {
  it('does stuff', () => {
    expect(getPossibleArrangementsAmount([1], '?')).toBe(1)
    expect(getPossibleArrangementsAmount([1], '??')).toBe(2)
    expect(getPossibleArrangementsAmount([1], '?.')).toBe(1)
    expect(getPossibleArrangementsAmount([1], '??#')).toBe(1)
    expect(getPossibleArrangementsAmount([1, 1], '??#')).toBe(1)
    expect(getPossibleArrangementsAmount([1, 1], '??#?')).toBe(1)
    expect(getPossibleArrangementsAmount([1, 1], '??#?')).toBe(1)
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

describe('unfoldSprings', () => {
  it('unfolds', () => {
    const unfolded = unfoldSprings(parseSprings(testInput))

    expect(unfolded[0].groups).toEqual([
      1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3, 1, 1, 3,
    ])
    expect(unfolded[0].pattern).toBe('???.###????.###????.###????.###????.###')
  })
})

describe('getCombinationsAmount w/ unfoldSprings', () => {
  it('gets em', () => {
    const springs = unfoldSprings(parseSprings(testInput))
    expect(getCombinationsAmount(springs[0])).toBe(1)
    expect(getCombinationsAmount(springs[1])).toBe(16384)
    expect(getCombinationsAmount(springs[2])).toBe(1)
    expect(getCombinationsAmount(springs[3])).toBe(16)
    expect(getCombinationsAmount(springs[4])).toBe(2500)
    expect(getCombinationsAmount(springs[5])).toBe(506250)
  })
})

describe('getSumOfCombinations', () => {
  it('gets it', () => {
    expect(getSumOfCombinations(parseSprings(testInput))).toBe(21)
    expect(getSumOfCombinations(unfoldSprings(parseSprings(testInput)))).toBe(
      525152
    )
  })
})
