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

export function turn(map: string[][]): string[][] {
  return map.reduce(
    (acc, row) => {
      for (let i = 0; i < row.length; i++) {
        acc[i].unshift(row[i])
      }
      return acc
    },
    Array(map[0].length)
      .fill(null)
      .map(() => [])
  )
}

export function cycle(map: string[][]): string[][] {
  // roll north
  simulate(map)

  // roll west
  map = turn(map)
  simulate(map)

  // roll south
  map = turn(map)
  simulate(map)

  // roll east
  map = turn(map)
  simulate(map)

  map = turn(map)
  return map
}

export function getTotalLoadAfterCycles(
  map: string[][],
  n = 1_000_000_000
): number {
  const data = new Map<string, number>()
  const key = (map: string[][]) => map.map(r => r.join('')).join('\n')

  let loopStart: number
  let loopEnd: number

  for (let i = 0; ; i++) {
    if (data.has(key(map))) {
      loopStart = data.get(key(map))
      loopEnd = i
      break
    }
    data.set(key(map), i)
    map = cycle(map)
  }

  const loopedPos = ((n - loopStart) % (loopEnd - loopStart)) + loopStart

  for (let [key, cycleN] of data.entries()) {
    if (cycleN === loopedPos) {
      return getTotalLoad(parseMap(key))
    }
  }
}

console.log(getTotalLoad(simulate(parseMap(input))))

console.log(getTotalLoadAfterCycles(parseMap(input)))
