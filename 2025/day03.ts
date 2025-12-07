import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day03.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseBatteries(input: string) {
  return input.split('\n').map(line => [...line].map(Number))
}

export function getLargestJoltage(bank: number[]) {
  const maxLeft = bank.slice(0, -1).reduce(
    (acc, cur, i) => {
      if (cur > acc.val) {
        acc.val = cur
        acc.index = i
      }
      return acc
    },
    { val: -1, index: -1 }
  )

  const maxRight = bank.slice(maxLeft.index + 1).reduce((acc, cur) => {
    if (cur > acc) {
      acc = cur
    }
    return acc
  }, -1)

  return maxLeft.val * 10 + maxRight
}

export function getJoltageSum(banks: number[][], calcBank = getLargestJoltage) {
  return banks.reduce((sum, bank) => sum + calcBank(bank), 0)
}

export function getLargestJoltage2(bank: number[]) {
  const SIZE = 12

  const result: number[] = []

  let pointer = 0
  let window = bank.length - pointer - (SIZE - 1 - result.length)

  while (result.length < SIZE) {
    const slice = bank.slice(pointer, pointer + window)
    const max = Math.max(...slice)
    const maxIndex = slice.findIndex(n => n === max)

    result.push(max)

    pointer += maxIndex + 1
    window = bank.length - pointer - (SIZE - 1 - result.length)
  }
  return Number(result.join(''))
}

console.time('p1')
console.log(getJoltageSum(parseBatteries(input)))
console.timeEnd('p1')

console.time('p2')
console.log(getJoltageSum(parseBatteries(input), getLargestJoltage2))
console.timeEnd('p2')
