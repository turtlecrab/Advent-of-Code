import { totalAmount, getAmount, parseData } from './day06'

const testInput = `Time:      7  15   30
Distance:  9  40  200`

describe('parseData', () => {
  it('parses', () => {
    expect(parseData(testInput)).toEqual([
      [7, 15, 30],
      [9, 40, 200],
    ])
  })
})

describe('getAmount', () => {
  it('gets it', () => {
    expect(getAmount(7, 9)).toBe(4)
    expect(getAmount(15, 40)).toBe(8)
    expect(getAmount(6, 7)).toBe(3)
    expect(getAmount(6, 8)).toBe(1)
    expect(getAmount(30, 200)).toBe(9)
  })
})

describe('totalAmount', () => {
  it('passes the test case', () => {
    expect(totalAmount(parseData(testInput))).toBe(288)
  })
})
