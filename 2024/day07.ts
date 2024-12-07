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

export function isPossibleLine({ value, nums }: Line, concat = false): boolean {
  if (nums.length < 2) throw new Error('nums.length < 2')

  if (nums.length === 2)
    return (
      nums[0] + nums[1] === value ||
      nums[0] * nums[1] === value ||
      (concat && nums.join('') === String(value))
    )

  const lastNum = nums.at(-1)
  const restNums = nums.slice(0, -1)

  const neededSumValue = value - lastNum
  const neededMultiplyValue = value / lastNum

  if (
    neededSumValue > 0 &&
    isPossibleLine(
      {
        value: neededSumValue,
        nums: restNums,
      },
      concat
    )
  )
    return true

  if (
    neededMultiplyValue === Math.floor(neededMultiplyValue) &&
    isPossibleLine(
      {
        value: neededMultiplyValue,
        nums: restNums,
      },
      concat
    )
  )
    return true

  if (concat && String(value).endsWith(String(lastNum))) {
    const neededConcatValue = Number(
      String(value).slice(0, -String(lastNum).length)
    )
    if (
      isPossibleLine(
        {
          value: neededConcatValue,
          nums: restNums,
        },
        concat
      )
    )
      return true
  }

  return false
}

export function getPossibleLinesSum(lines: Line[], concat = false): number {
  return lines
    .filter(line => isPossibleLine(line, concat))
    .map(line => line.value)
    .reduce((a, b) => a + b)
}

console.log(getPossibleLinesSum(parseLines(input)))
console.log(getPossibleLinesSum(parseLines(input), true))
