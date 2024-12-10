import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day10.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

type Grid = number[][]

export function parseGrid(input: string): [Grid, Vec[]] {
  const lines = input.split('\n')

  const grid: number[][] = []
  const heads: Vec[] = []

  for (let y = 0; y < lines.length; y++) {
    grid.push([])

    for (let x = 0; x < lines[0].length; x++) {
      grid[y].push(Number(lines[y][x]))

      if (grid[y][x] === 0) {
        heads.push({ x, y })
      }
    }
  }
  return [grid, heads]
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })

const isPositionInBounds = (pos: Vec, w: number, h: number): boolean =>
  pos.x >= 0 && pos.y >= 0 && pos.x < w && pos.y < h

const dirs = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },
]

export function getHeadScore(head: Vec, grid: Grid): number {
  const endPositions = new Set<string>()
  const key = (pos: Vec) => `${pos.x},${pos.y}`

  const getTile = (pos: Vec) => grid[pos.y][pos.x]

  const stack = [head]

  while (stack.length) {
    const cur = stack.pop()

    if (getTile(cur) === 9) {
      endPositions.add(key(cur))
      continue
    }

    for (let dir of dirs) {
      const next = sumVec(cur, dir)

      if (!isPositionInBounds(next, grid[0].length, grid.length)) {
        continue
      }
      if (getTile(next) - getTile(cur) === 1) {
        stack.push(next)
      }
    }
  }
  return endPositions.size
}

export function getScoreSum(grid: Grid, heads: Vec[]): number {
  return heads.map(head => getHeadScore(head, grid)).reduce((a, b) => a + b)
}

console.log(getScoreSum(...parseGrid(input)))
