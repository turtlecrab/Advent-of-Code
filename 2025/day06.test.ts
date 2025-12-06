import { getSum, getSum2, parse, parse2 } from './day06'

const testInput = `
123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `.trimStart()

describe('Day06', () => {
  it('works for test input', () => {
    expect(getSum(parse(testInput))).toBe(4277556)
  })
})

describe('part 2', () => {
  it('works for test input', () => {
    expect(getSum2(parse2(testInput))).toBe(3263827)
  })
})
