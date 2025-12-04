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

export function getJoltageSum(banks: number[][]) {
  return banks.reduce((sum, bank) => sum + getLargestJoltage(bank), 0)
}

console.time('p1')
console.log(getJoltageSum(parseBatteries(input)))
console.timeEnd('p1')
