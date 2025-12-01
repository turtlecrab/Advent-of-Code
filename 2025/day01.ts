import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day01.input.txt', 'utf8')
  .replace(/\r/g, '')

const modulo = (n: number, d: number) => ((n % d) + d) % d

export function parseDials(input: string) {
  return input
    .split('\n')
    .map(line => Number(line.slice(1)) * (line.startsWith('L') ? -1 : 1))
}

export function getPassword(dials: number[]) {
  let cur = 50
  let password = 0

  for (let dial of dials) {
    cur = modulo(cur + dial, 100)

    if (cur === 0) {
      password += 1
    }
  }
  return password
}

console.log(getPassword(parseDials(input)))
