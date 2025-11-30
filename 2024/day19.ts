import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day19.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseTowels(input: string): [string[], Set<string>] {
  const [patterns, designs] = input.split('\n\n')

  return [designs.split('\n'), new Set(patterns.split(', '))]
}

export function isPossible(
  design: string,
  patterns: Set<string>,
  impossible = new Set<string>()
): boolean {
  if (patterns.has(design)) return true
  if (impossible.has(design)) return false

  if (design.length === 1) {
    impossible.add(design)
    return false
  }

  for (let i = 1; i < design.length; i++) {
    const left = design.slice(0, i)
    const right = design.slice(i)

    const result =
      isPossible(left, patterns, impossible) &&
      isPossible(right, patterns, impossible)

    if (result) {
      patterns.add(design)
      return true
    }
  }

  impossible.add(design)
  return false
}

export function getPossibleCount(
  designs: string[],
  patterns: Set<string>,
  impossible = new Set<string>()
): number {
  return designs.filter(d => isPossible(d, patterns, impossible)).length
}

export function permutateSets(a: Set<string>, b: Set<string>): Set<string> {
  const result = new Set<string>()

  for (let aItem of a) {
    for (let bItem of b) {
      result.add(`${aItem}-${bItem}`)
    }
  }
  return result
}

export function getCombinations(
  design: string,
  patterns: Set<string>,
  combinations = new Map<string, Set<string>>()
): Set<string> {
  if (combinations.has(design)) {
    return combinations.get(design)
  }

  if (design.length === 1) {
    if (patterns.has(design)) {
      combinations.set(design, new Set(design))
      return combinations.get(design)
    } else {
      combinations.set(design, new Set())
      return combinations.get(design)
    }
  }

  let result = new Set<string>()

  if (patterns.has(design)) {
    result.add(design)
  }

  for (let i = 1; i < design.length; i++) {
    const left = design.slice(0, i)
    const right = design.slice(i)

    const leftCombs = getCombinations(left, patterns, combinations)
    const rightCombs = getCombinations(right, patterns, combinations)

    permutateSets(leftCombs, rightCombs).forEach(item => result.add(item))
  }

  combinations.set(design, result)
  return result
}

export function getCombinationSum(
  designs: string[],
  patterns: Set<string>,
  combinations = new Map<string, Set<string>>()
) {
  return designs
    .filter(d => isPossible(d, new Set(patterns)))
    .map(d => getCombinations(d, patterns, combinations).size)
    .reduce((a, b) => a + b)
}

console.log(getPossibleCount(...parseTowels(input)))
console.time()
console.log(getCombinationSum(...parseTowels(input)))
console.timeEnd()
