import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day25.input.txt', 'utf8')
  .replace(/\r/g, '')

export function snafuToDec(snafu: string): number {
  let result = 0
  for (let i = 0; i < snafu.length; i++) {
    const letter = snafu.at(-i - 1)

    let dec = 0
    if (letter === '=') dec = -2
    else if (letter === '-') dec = -1
    else if (letter === '0') dec = 0
    else if (letter === '1') dec = 1
    else if (letter === '2') dec = 2

    result += dec * 5 ** i
  }
  return result
}

export function getSnafuSum(str: string): number {
  return str
    .split('\n')
    .map(snafuToDec)
    .reduce((a, b) => a + b)
}

export function decToSnafu(num: number): string {
  let exp = 0
  while (5 ** exp <= num) {
    exp += 1
  }

  const snafu = []
  for (let i = exp; i >= 0; i--) {
    const cur = Math.floor(num / 5 ** i)
    snafu.push(cur)
    num = num % 5 ** i
  }

  for (let i = snafu.length - 1; i > 0; i--) {
    if (snafu[i] === 3) {
      snafu[i] = '='
      snafu[i - 1] += 1
    } else if (snafu[i] === 4) {
      snafu[i] = '-'
      snafu[i - 1] += 1
    } else if (snafu[i] === 5) {
      snafu[i] = 0
      snafu[i - 1] += 1
    }
  }
  if (snafu[0] === 0) snafu.shift()
  return snafu.join('')
}

console.log(decToSnafu(getSnafuSum(input)))
