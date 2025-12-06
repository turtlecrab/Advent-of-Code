import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day06.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parse(input: string) {
  const lines = input.split('\n')

  return {
    lines: lines.slice(0, -1).map(line => line.trim().split(/\s+/).map(Number)),
    ops: lines.at(-1).trim().split(/\s+/),
  }
}

export function getSum({ lines, ops }: ReturnType<typeof parse>) {
  let sum = 0

  for (let i = 0; i < ops.length; i++) {
    const nums = lines.map(line => line[i])
    const op = ops[i]

    sum += nums.reduce((a, b) => (op === '+' ? a + b : a * b))
  }
  return sum
}

console.time('p1')
console.log(getSum(parse(input)))
console.timeEnd('p1')
