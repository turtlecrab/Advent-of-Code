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
  const middle = Math.floor(time / 2)

  for (let delta = 1; ; delta++) {
    const next = middle - delta

    if (next * (time - next) <= record) {
      if (time % 2 === 0) {
        return delta * 2 - 1
      }
      return delta * 2
    }
  }
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
