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

const cache = new Map<string, number>()

export function getPossibleArrangementsAmount(
  groups: number[],
  pattern: string
): number {
  const cacheKey = `${groups.join(',')};${pattern}`

  if (cache.has(cacheKey)) return cache.get(cacheKey)

  const space = pattern.length

  if (groups.length === 1) {
    const result = Array(space - groups[0] + 1)
      .fill(null)
      .map(
        (_, i) =>
          '.'.repeat(i) +
          '#'.repeat(groups[0]) +
          '.'.repeat(space - i - groups[0])
      )
      .filter(str => isMatching(str, pattern)).length

    cache.set(cacheKey, result)
    return result
  }

  const [first, ...rest] = groups
  const restMinSpace = rest.reduce((a, b) => a + b) + rest.length - 1
  const firstPossiblePositions = space - restMinSpace - first

  let result = 0

  for (let i = 0; i < firstPossiblePositions; i++) {
    const curStr = '.'.repeat(i) + '#'.repeat(first) + '.'

    if (!isMatching(curStr, pattern.slice(0, curStr.length))) {
      continue
    }
    result += getPossibleArrangementsAmount(rest, pattern.slice(curStr.length))
  }

  cache.set(cacheKey, result)
  return result
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
  return getPossibleArrangementsAmount(spring.groups, spring.pattern)
}

export function getSumOfCombinations(springs: Spring[]): number {
  return springs.map(getCombinationsAmount).reduce((a, b) => a + b)
}

export function unfoldSprings(springs: Spring[]): Spring[] {
  return springs.map(spring => ({
    groups: Array(5)
      .fill(null)
      .flatMap(() => [...spring.groups]),
    pattern: Array(5).fill(spring.pattern).join('?'),
  }))
}

console.log(getSumOfCombinations(parseSprings(input)))

console.log(getSumOfCombinations(unfoldSprings(parseSprings(input))))
