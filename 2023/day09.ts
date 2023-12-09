import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day09.input.txt', 'utf8')
  .replace(/\r/g, '')

export function predict(str: string): number {
  const history = str.split(' ').map(Number)

  const seq = [history]

  while (seq.at(-1).some(n => n !== 0)) {
    const last = seq.at(-1)
    const next = last.slice(1).map((v, i) => v - last[i])

    seq.push(next)
  }

  seq.at(-1).push(0)

  for (let i = seq.length - 2; i >= 0; i--) {
    seq[i].push(seq[i].at(-1) + seq[i + 1].at(-1))
  }

  return seq[0].at(-1)
}

export function getExtrapolatedSum(input: string): number {
  return input
    .split('\n')
    .map(predict)
    .reduce((a, b) => a + b)
}

console.log(getExtrapolatedSum(input))
