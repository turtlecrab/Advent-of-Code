import {
  getValidMultiplicationsSum,
  parseValidMultiplications,
  parseValidMultiplications2,
} from './day03'

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`
const testInput2 = `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`

describe('getValidMultiplicationsSum', () => {
  it('works for test input part 1', () => {
    expect(
      getValidMultiplicationsSum(parseValidMultiplications(testInput))
    ).toBe(161)
  })
  it('works for test input part 2', () => {
    expect(
      getValidMultiplicationsSum(parseValidMultiplications2(testInput2))
    ).toBe(48)
  })
})
