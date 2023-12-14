import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day14.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseMap(input: string): string[][] {
  return input.split('\n').map(s => [...s])
}

export function step(map: string[][], row: number): void {
  const width = map[0].length

  for (let i = 0; i < width; i++) {
    if (map[row - 1][i] === '.' && map[row][i] === 'O') {
      map[row - 1][i] = 'O'
      map[row][i] = '.'
    }
  }
}

export function simulate(map: string[][]): string[][] {
  for (let i = map.length; i > 0; i--) {
    for (let j = 1; j < i; j++) {
      step(map, j)
    }
  }
  return map
}

export function getTotalLoad(map: string[][]): number {
  return map
    .map((row, i) => row.filter(char => char === 'O').length * (map.length - i))
    .reduce((a, b) => a + b)
}

console.log(getTotalLoad(simulate(parseMap(input))))
