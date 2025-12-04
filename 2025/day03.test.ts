import { getJoltageSum, getLargestJoltage, parseBatteries } from './day03'

const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`

describe('getLargestJoltage', () => {
  it('works for test input', () => {
    expect(getLargestJoltage([...'987654321111111'].map(Number))).toBe(98)
    expect(getLargestJoltage([...'811111111111119'].map(Number))).toBe(89)
    expect(getLargestJoltage([...'234234234234278'].map(Number))).toBe(78)
    expect(getLargestJoltage([...'818181911112111'].map(Number))).toBe(92)
  })
})

describe('part 1', () => {
  it('works for test input', () => {
    expect(getJoltageSum(parseBatteries(testInput))).toBe(357)
  })
})
