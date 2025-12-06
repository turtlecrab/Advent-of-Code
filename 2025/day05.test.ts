import { getAllFreshCount, getFreshCount, parse } from './day05'

const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`

describe('part 1', () => {
  it('works for test input', () => {
    expect(getFreshCount(parse(testInput))).toBe(3)
  })
})

describe('part 2', () => {
  it('works for test input', () => {
    expect(getAllFreshCount(parse(testInput).fresh)).toBe(14)
  })
})
