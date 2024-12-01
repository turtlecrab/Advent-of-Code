import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day01.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseLists(input: string): [number[], number[]] {
  return input.split('\n').reduce(
    (acc, line) => {
      const values = line.split(/\s+/).map(Number)
      acc[0].push(values[0])
      acc[1].push(values[1])

      return acc
    },
    [[], []] as [number[], number[]]
  )
}

export function getSortedDifferenceSum(a: number[], b: number[]): number {
  const sortedA = a.toSorted((a, b) => a - b)
  const sortedB = b.toSorted((a, b) => a - b)

  return sortedA.reduce(
    (sum, _, i) => sum + Math.abs(sortedA[i] - sortedB[i]),
    0
  )
}

console.log(getSortedDifferenceSum(...parseLists(input)))
