import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day13.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parsePatterns(input: string): string[][] {
  return input.split('\n\n').map(p => p.split('\n'))
}

export function findSymmetry(pattern: string[]): {
  type: '-' | '|'
  index: number
} {
  // horizontal
  for (let i = 1; i < pattern.length; i++) {
    let symm = true

    for (let j = 0; j < Math.min(pattern.length - i, i); j++) {
      const up = pattern[i - j - 1]
      const down = pattern[i + j]

      if (up !== down) {
        symm = false
      }
    }
    if (symm) return { type: '-', index: i }
  }
  // vertical
  const width = pattern[0].length
  for (let i = 1; i < width; i++) {
    let symm = true

    for (let j = 0; j < Math.min(width - i, i); j++) {
      const left = pattern.map(row => row[i - j - 1]).join('')
      const right = pattern.map(row => row[i + j]).join('')

      if (left !== right) {
        symm = false
      }
    }
    if (symm) return { type: '|', index: i }
  }
  throw new Error('no symmetry')
}

export function getDiff(a: string, b: string): number {
  return a
    .split('')
    .map((char, i) => char !== b[i])
    .filter(Boolean).length
}

export function findSmudgedSymmetry(pattern: string[]): {
  type: '-' | '|'
  index: number
} {
  // horizontal
  for (let i = 1; i < pattern.length; i++) {
    let diff = 0

    for (let j = 0; j < Math.min(pattern.length - i, i); j++) {
      const up = pattern[i - j - 1]
      const down = pattern[i + j]

      diff += getDiff(up, down)
    }
    if (diff === 1) return { type: '-', index: i }
  }
  // vertical
  const width = pattern[0].length
  for (let i = 1; i < width; i++) {
    let diff = 0

    for (let j = 0; j < Math.min(width - i, i); j++) {
      const left = pattern.map(row => row[i - j - 1]).join('')
      const right = pattern.map(row => row[i + j]).join('')

      diff += getDiff(left, right)
    }
    if (diff === 1) return { type: '|', index: i }
  }
  throw new Error('no symmetry')
}

export function getSum(patterns: string[][], withSmudge = false): number {
  return patterns
    .map(withSmudge ? findSmudgedSymmetry : findSymmetry)
    .map(sym => (sym.type === '|' ? sym.index : sym.index * 100))
    .reduce((a, b) => a + b)
}

console.log(getSum(parsePatterns(input)))

console.log(getSum(parsePatterns(input), true))
