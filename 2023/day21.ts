import * as fs from 'fs'
import { Deque } from '@blakeembrey/deque'

const input = fs
  .readFileSync(__dirname + '/day21.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty = '.',
  Rock = '#',
}

type Grid = Tile[][]

type Position = {
  y: number
  x: number
}

type Step = Position & { step: number }

export function parseMap(input: string): [grid: Grid, start: Position] {
  let start: Position
  const grid = input.split('\n').map((row, y) =>
    row.split('').map((tile, x) => {
      if (tile === 'S') {
        start = { y, x }
        return Tile.Empty
      }
      return tile as Tile
    })
  )
  return [grid, start]
}

export function nextPos(pos: Step, dir: Position, grid: Grid): Position | null {
  const next = { y: pos.y + dir.y, x: pos.x + dir.x }
  if (
    next.y < 0 ||
    next.y >= grid.length ||
    pos.x < 0 ||
    pos.x >= grid[0].length
  ) {
    return null
  }
  if (grid[next.y][next.x] === Tile.Rock) return null
  return next
}

export function play(grid: Grid, start: Position, maxSteps = 64) {
  const q = new Deque<Step>([{ ...start, step: 0 }])

  const visited = new Map<string, number>()
  const key = (pos: Required<Position>) => `${pos.y}:${pos.x}`

  const queued = new Set<string>(key(start))

  while (q.size) {
    const cur = q.popLeft()

    visited.set(key(cur), cur.step)

    if (cur.step >= maxSteps) continue

    for (let dir of [
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: -1 },
    ]) {
      const next = nextPos(cur, dir, grid)
      if (next && !queued.has(key(next))) {
        q.push({ ...next, step: cur.step + 1 })
        queued.add(key(next))
      }
    }
  }
  return visited
}

export function getEvenVisitedCount(visited: Map<string, number>) {
  return [...visited.values()].filter(steps => steps % 2 === 0).length
}

console.log(getEvenVisitedCount(play(...parseMap(input))))
