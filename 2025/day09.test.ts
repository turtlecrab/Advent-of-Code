import { findMax, parse } from './day09'

const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`

describe('Day09', () => {
  it('works for test input', () => {
    expect(findMax(parse(testInput))).toBe(50)
  })
})
