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
  impossible: Set<string>
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
  patterns: Set<string>
): number {
  const impossible = new Set<string>()
  return designs.filter(d => isPossible(d, patterns, impossible)).length
}

console.log(getPossibleCount(...parseTowels(input)))
