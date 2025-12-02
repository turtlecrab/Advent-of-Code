import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day02.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseRanges(input: string) {
  return input.split(',').map(line => line.split('-').map(Number))
}

export function getInvalidSum(ranges: number[][]) {
  return ranges.map(range => getInvalidCount(range)).reduce((a, b) => a + b)
}

export function getInvalidCount([from, to]: number[]) {
  return invalidsBetween(from, to).reduce((a, b) => a + b, 0)
}

const double = (n: number) => Number(`${n}${n}`)
const leftHalf = (n: number) => {
  // return Math.floor(n / 10 ** (Math.floor(String(n).length) / 2))
  const s = n.toString()
  return Number(s.slice(0, s.length / 2))
}
const firstNumNoLeadingZeroes = (len: number) => 10 ** (len - 1)

export function* invalidsBetween(from: number, to: number) {
  const fromLen = String(from).length

  let halfNum =
    fromLen % 2 !== 0
      ? firstNumNoLeadingZeroes(Math.ceil(fromLen / 2))
      : leftHalf(from)

  while (double(halfNum) < from) {
    halfNum += 1
  }

  while (double(halfNum) <= to) {
    yield double(halfNum)
    halfNum += 1
  }
}

console.time('p1')
console.log(getInvalidSum(parseRanges(input)))
console.timeEnd('p1')
