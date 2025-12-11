import { findShortest, getSum, parse } from './day10'

const testInput = `[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}`

describe('Day10', () => {
  it('works for test input', () => {
    const parsed = parse(testInput)

    expect(findShortest(parsed[0].target, parsed[0].buttons).distance).toBe(2)
    expect(findShortest(parsed[1].target, parsed[1].buttons).distance).toBe(3)
    expect(findShortest(parsed[2].target, parsed[2].buttons).distance).toBe(2)

    expect(getSum(parsed)).toBe(7)
  })
})
