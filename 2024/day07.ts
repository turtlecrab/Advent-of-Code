import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day07.input.txt', 'utf8')
  .replace(/\r/g, '')

type Line = {
  value: number
  nums: number[]
}

export function parseLines(input: string): Line[] {
  return input
    .split('\n')
    .map(line => line.replace(':', '').split(' ').map(Number))
    .map(([value, ...nums]) => ({ value, nums }))
}

export function isPossibleLine({ value, nums }: Line): boolean {
  if (nums.length < 2) throw new Error('nums.length < 2')

  if (nums.length === 2)
    return nums[0] + nums[1] === value || nums[0] * nums[1] === value

  const lastNum = nums.at(-1)
  const restNums = nums.slice(0, -1)

  const neededSumValue = value - lastNum
  const neededMultiplyValue = value / lastNum

  if (
    neededSumValue > 0 &&
    isPossibleLine({
      value: neededSumValue,
      nums: restNums,
    })
  )
    return true

  if (
    neededMultiplyValue === Math.floor(neededMultiplyValue) &&
    isPossibleLine({
      value: neededMultiplyValue,
      nums: restNums,
    })
  )
    return true

  return false
}

export function getPossibleLinesSum(lines: Line[]): number {
  return lines
    .filter(isPossibleLine)
    .map(line => line.value)
    .reduce((a, b) => a + b)
}

console.log(getPossibleLinesSum(parseLines(input)))
