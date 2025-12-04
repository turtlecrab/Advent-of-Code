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

export function getPassword2(dials: number[]) {
  let cur = 50
  let password = 0

  for (let dial of dials) {
    password += getZeroCrossings(cur, cur + dial)

    cur = modulo(cur + dial, 100)
  }
  return password
}

export function getZeroCrossings(from: number, to: number) {
  let count = 0
  const dir = Math.sign(to - from)

  for (let i = from; i !== to; i += dir) {
    if (i % 100 === 0) count += 1
  }
  return count
}

console.time('p1')
console.log(getPassword(parseDials(input)))
console.timeEnd('p1')

console.time('p2')
console.log(getPassword2(parseDials(input)))
console.timeEnd('p2')
