import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day03.input.txt', 'utf8')
  .replace(/\r/g, '')

export function getValidMultiplications(input: string): number[][] {
  return input.match(/mul\(\d+,\d+\)/g).map(s => s.match(/\d+/g).map(Number))
}

export function getValidMultiplicationsSum(input: string): number {
  return getValidMultiplications(input).reduce((acc, [a, b]) => acc + a * b, 0)
}

console.log(getValidMultiplicationsSum(input))
