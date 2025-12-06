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

export function parse2(input: string) {
  const lines = input.split('\n')

  const commands: { op: string; nums: number[] }[] = []

  for (let x = 0; x < lines[0].length; x++) {
    const col = lines.map(line => line[x])

    if (col.every(char => char === ' ')) {
      continue
    }

    const op = col.at(-1)

    if (op !== ' ') {
      commands.push({ op, nums: [] })
    }

    const num = Number(col.slice(0, -1).join(''))

    commands.at(-1).nums.push(num)
  }

  return commands
}

export function getSum2(commands: ReturnType<typeof parse2>) {
  return commands
    .map(cmd => cmd.nums.reduce((a, b) => (cmd.op === '+' ? a + b : a * b)))
    .reduce((a, b) => a + b)
}

console.time('p1')
console.log(getSum(parse(input)))
console.timeEnd('p1')

console.time('p2')
console.log(getSum2(parse2(input)))
console.timeEnd('p2')
