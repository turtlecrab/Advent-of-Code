import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day12.input.txt', 'utf8')
  .replace(/\r/g, '')

type Spring = {
  pattern: string
  groups: number[]
}

export function parseSprings(input: string): Spring[] {
  return input.split('\n').map(line => {
    const [pattern, nums] = line.split(' ')
    return {
      pattern,
      groups: nums.split(',').map(Number),
    }
  })
}

export function getPossibleArrangements(
  groups: number[],
  space: number
): string[] {
  const minSpace = groups.reduce((a, b) => a + b) + groups.length - 1

  if (space < minSpace) throw new Error('space < minSpace')
  if (groups.length === 0) throw new Error('empty groups')

  if (space === minSpace) {
    return [groups.map(n => '#'.repeat(n)).join('.')]
  }

  if (groups.length === 1) {
    return Array(space - groups[0] + 1)
      .fill(null)
      .map(
        (_, i) =>
          '.'.repeat(i) +
          '#'.repeat(groups[0]) +
          '.'.repeat(space - i - groups[0])
      )
  }

  const [first, ...rest] = groups
  const restMinSpace = rest.reduce((a, b) => a + b) + rest.length - 1
  const firstPossiblePositions = space - restMinSpace - first

  return Array(firstPossiblePositions)
    .fill(null)
    .flatMap((_, i) => {
      const curStr = '.'.repeat(i) + '#'.repeat(first) + '.'
      const restSpace = space - curStr.length
      return getPossibleArrangements(rest, restSpace).map(s => curStr + s)
    })
}

export function isMatching(str: string, pattern: string): boolean {
  if (str.length !== pattern.length) throw new Error("lengths don't match")

  for (let i = 0; i < str.length; i++) {
    if (pattern[i] === '?') continue
    if (str[i] !== pattern[i]) return false
  }
  return true
}

export function getCombinationsAmount(spring: Spring): number {
  const arrangements = getPossibleArrangements(
    spring.groups,
    spring.pattern.length
  )
  return arrangements.filter(str => isMatching(str, spring.pattern)).length
}

export function getSumOfCombinations(springs: Spring[]): number {
  return springs.map(getCombinationsAmount).reduce((a, b) => a + b)
}

console.log(getSumOfCombinations(parseSprings(input)))
