import { compareData, getIndicesOfCorrectOnes, parsePackets } from './day13'

const testInput = `[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]`

describe('parsePackets', () => {
  it('parses packets', () => {
    expect(parsePackets(testInput)).toHaveLength(8)
    expect(parsePackets(testInput)[7].right[1][1][1][1]).toEqual([5, 6, 0])
  })
})

describe('compareData', () => {
  it('works for numbers', () => {
    expect(compareData(0, 0)).toBe(0)
    expect(compareData(-1, 0)).toBe(-1)
    expect(compareData(3, 2)).toBe(1)
  })
  it('works for array of numbers', () => {
    expect(compareData([0, 0, 0], [0, 0, 0])).toBe(0)
    expect(compareData([0, 0, -1], [0, 0, 0])).toBe(-1)
    expect(compareData([0, 0, -1], [0, 0, -3])).toBe(1)
  })
  it('works for nested arrays', () => {
    expect(compareData([0, 0, [0, 0, 0]], [0, 0, [0, 0, 0]])).toBe(0)
    expect(compareData([0, 0, [0, -1, 0]], [0, 0, [0, 0, 0]])).toBe(-1)
    expect(
      compareData(
        [1, [2, [3, [4, [5, 6, 7]]]], 8, 9],
        [1, [2, [3, [4, [5, 6, 0]]]], 8, 9]
      )
    ).toBe(1)
  })
  it('works for arrays w/ different lengths', () => {
    expect(compareData([7, 7, 7, 7], [7, 7, 7])).toBe(1)
    expect(compareData([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBe(-1)
  })
  it('works for empty arrays', () => {
    expect(compareData([], [])).toBe(0)
  })
})

describe('getIndicesOfCorrectOnes', () => {
  it('returns indices', () => {
    expect(getIndicesOfCorrectOnes(parsePackets(testInput))).toEqual([
      1, 2, 4, 6,
    ])
  })
})
