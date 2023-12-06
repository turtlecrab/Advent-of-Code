import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day06.input.txt', 'utf8')
  .replace(/\r/g, '')

type Data = [number[], number[]]

export function parseData(str: string) {
  return str
    .split('\n')
    .map(line => line.split(':')[1].trim().split(/\s+/).map(Number)) as Data
}

export function parseData2(str: string) {
  return str
    .split('\n')
    .map(line => line.split(':')[1].replace(/\s+/g, ''))
    .map(Number) as [number, number]
}

export function getAmount(time: number, record: number): number {
  // x * (time - x) - record = 0
  // -x^2 + x*time - record = 0
  // a = -1, b = time, c = -record
  // D = b^2 - 4*a*c

  const d = time * time - 4 * record

  const x1 = (-time + Math.sqrt(d)) / -2
  const x2 = (-time - Math.sqrt(d)) / -2

  return Math.ceil(x2) - Math.floor(x1) - 1
}

export function totalAmount(data: Data): number {
  return data[0]
    .map((time, i) => [time, data[1][i]])
    .map(([time, record]) => {
      return getAmount(time, record)
    })
    .reduce((a, c) => a * c)
}

console.log(totalAmount(parseData(input)))

console.log(getAmount(...parseData2(input)))
