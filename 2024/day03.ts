import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day03.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseValidMultiplications(input: string): number[][] {
  return input.match(/mul\(\d+,\d+\)/g).map(s => s.match(/\d+/g).map(Number))
}

export function parseValidMultiplications2(input: string): number[][] {
  const instructions = input.match(/(mul\(\d+,\d+\)|do\(\)|don't\(\))/g)
  const result: number[][] = []

  let doNext = true

  for (let instruction of instructions) {
    switch (true) {
      case instruction.includes('mul'):
        if (doNext) {
          result.push(instruction.match(/\d+/g).map(Number))
        }
        break
      case instruction === "don't()":
        doNext = false
        break
      case instruction === 'do()':
        doNext = true
        break
    }
  }
  return result
}

export function getValidMultiplicationsSum(data: number[][]): number {
  return data.reduce((acc, [a, b]) => acc + a * b, 0)
}

console.log(getValidMultiplicationsSum(parseValidMultiplications(input)))
console.log(getValidMultiplicationsSum(parseValidMultiplications2(input)))
