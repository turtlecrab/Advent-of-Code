import { getGroveCoords, mix, parseNums } from './day20'

const testInput = `1
2
-3
3
-2
0
4`

describe('parseNums', () => {
  it('does stuff', () => {
    const nums = parseNums(testInput)
    // console.log(nums)
    expect(nums).toHaveLength(7)
    expect(nums[4].value).toBe(-2)
  })
})

describe('mix', () => {
  it('does stuff', () => {
    const nums = parseNums(testInput)
    // console.log(nums)
    const next = mix(nums)
    // console.log('next:', next)
    expect(mix(nums, 1).map(o => +o.value)).toEqual([2, 1, -3, 3, -2, 0, 4])
    expect(mix(nums, 2).map(o => +o.value)).toEqual([1, -3, 2, 3, -2, 0, 4])
    expect(mix(nums, 3).map(o => +o.value)).toEqual([1, 2, 3, -2, -3, 0, 4])
    expect(mix(nums, 4).map(o => +o.value)).toEqual([1, 2, -2, -3, 0, 3, 4])
    expect(mix(nums, 5).map(o => +o.value)).toEqual([1, 2, -3, 0, 3, 4, -2])
    expect(mix(nums, 6).map(o => +o.value)).toEqual([1, 2, -3, 0, 3, 4, -2])
    expect(mix(nums, 7).map(o => +o.value)).toEqual([1, 2, -3, 4, 0, 3, -2])
  })
})

describe('getGroveCoords', () => {
  it('does stuff', () => {
    expect(getGroveCoords(mix(parseNums(testInput)))).toBe(3)
  })
})
