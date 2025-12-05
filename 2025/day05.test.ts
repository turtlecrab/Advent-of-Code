import { getFreshCount, parse } from './day05'

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

describe('Day05', () => {
  it('works for test input', () => {
    expect(getFreshCount(parse(testInput))).toBe(3)
  })
})
