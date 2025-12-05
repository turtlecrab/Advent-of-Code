import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day05.input.txt', 'utf8')
  .replace(/\r/g, '')

type Range = [number, number]

export function parse(input: string) {
  const [fresh, ids] = input.split('\n\n')

  return {
    fresh: fresh.split('\n').map(line => line.split('-').map(Number) as Range),
    ids: ids.split('\n').map(Number),
  }
}

export function isInRange(n: number, range: Range) {
  return n >= range[0] && n <= range[1]
}

export function getFreshCount({
  fresh,
  ids,
}: {
  fresh: Range[]
  ids: number[]
}) {
  return ids.filter(id => fresh.some(range => isInRange(id, range))).length
}

console.time('p1')
console.log(getFreshCount(parse(input)))
console.timeEnd('p1')
