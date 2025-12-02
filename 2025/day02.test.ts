import {
  getInvalidCount,
  getInvalidCount2,
  getInvalidSum,
  invalidsBetween,
  parseRanges,
} from './day02'

const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,
1698522-1698528,446443-446449,38593856-38593862,565653-565659,
824824821-824824827,2121212118-2121212124`

describe('invalidsBetween', () => {
  it('works', () => {
    expect([...invalidsBetween(11, 22)]).toEqual([11, 22])
    expect([...invalidsBetween(1188511880, 1188511890)]).toEqual([1188511885])
    expect([...invalidsBetween(222220, 222224)]).toEqual([222222])
    expect([...invalidsBetween(1698522, 1698528)]).toEqual([])
  })
})

describe('getInvalidSum', () => {
  it('works for test input', () => {
    expect(getInvalidSum(parseRanges(testInput), getInvalidCount)).toBe(
      1227775554
    )
  })
})

describe('getInvalidSum part 2', () => {
  it('works for test input', () => {
    expect(getInvalidSum(parseRanges(testInput), getInvalidCount2)).toBe(
      4174379265
    )
  })
})
