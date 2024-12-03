import { getValidMultiplicationsSum } from './day03'

const testInput = `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`

describe('getValidMultiplicationsSum', () => {
  it('works for test input', () => {
    expect(getValidMultiplicationsSum(testInput)).toBe(161)
  })
})
