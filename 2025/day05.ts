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

export function canMerge(a: Range, b: Range) {
  if (a[0] > b[1] + 1 || b[0] > a[1] + 1) {
    return false
  }
  return true
}

export function merge(a: Range, b: Range): Range {
  const start = Math.min(...a, ...b)
  const end = Math.max(...a, ...b)

  return [start, end]
}

export function mergeRanges(ranges: Range[]) {
  let allMerged: Range[] = []

  outer: while (ranges.length > 1) {
    let last = ranges.pop()

    for (let i = 0; i < ranges.length; i++) {
      let cur = ranges[i]

      if (canMerge(last, cur)) {
        const merged = merge(last, cur)
        ranges.splice(i, 1)
        ranges.push(merged)
        continue outer
      }
    }
    allMerged.push(last)
  }
  allMerged.push(...ranges)

  return allMerged
}

export function getAllFreshCount(fresh: Range[]) {
  return mergeRanges(fresh)
    .map(r => r[1] - r[0] + 1)
    .reduce((a, b) => a + b)
}

console.time('p1')
console.log(getFreshCount(parse(input)))
console.timeEnd('p1')

console.time('p2')
console.log(getAllFreshCount(parse(input).fresh))
console.timeEnd('p2')
