import { MinPriorityQueue } from 'datastructures-js'
import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day20.input.txt', 'utf8')
  .replace(/\r/g, '')

export type Vec = {
  x: number
  y: number
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
const isVecEqual = (a: Vec, b: Vec) => a.x === b.x && a.y === b.y
const dirs = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]

enum Tile {
  Empty = '.',
  Wall = '#',
}

export type Grid = Tile[][]

export function parseGrid(input: string): [Grid, Vec, Vec] {
  let start: Vec = { x: 0, y: 0 }
  let finish: Vec = { x: 0, y: 0 }

  const grid = input.split('\n').map((line, y) =>
    line.split('').map((cell, x) => {
      if (cell === 'S') {
        start = { x, y }
        return Tile.Empty
      } else if (cell === 'E') {
        finish = { x, y }
        return Tile.Empty
      }
      return cell as Tile
    })
  )
  return [grid, start, finish]
}

export type State = {
  pos: Vec
  step: number
  prev: State | null
}

const manhattan = (a: Vec, b: Vec) => Math.abs(a.x - b.x) + Math.abs(a.y - b.y)

export function findPath(grid: Grid, start: Vec, finish: Vec) {
  const visited = new Set<string>()
  const key = (pos: Vec) => `${pos.x}:${pos.y}`

  const startNode: State = {
    pos: start,
    step: 0,
    prev: null,
  }

  const queue = new MinPriorityQueue<State>(
    ({ pos, step }) => step + manhattan(pos, finish)
  )
  queue.push(startNode)

  while (!queue.isEmpty()) {
    const cur = queue.pop()

    if (isVecEqual(cur.pos, finish)) {
      return cur
    }

    if (visited.has(key(cur.pos))) continue
    if (grid[cur.pos.y][cur.pos.x] === Tile.Wall) continue

    for (let dir of dirs) {
      queue.push({
        pos: sumVec(cur.pos, dir),
        step: cur.step + 1,
        prev: cur,
      })
    }
    visited.add(key(cur.pos))
  }
}

export function calculateCheats(
  grid: Grid,
  start: Vec,
  finish: Vec
): Record<string, number> {
  const stepsWithoutCheats = findPath(grid, start, finish).step

  const tileAt = (pos: Vec) => grid[pos.y]?.[pos.x]
  const neighborsAt = (pos: Vec) => dirs.map(dir => tileAt(sumVec(pos, dir)))

  const isPossibleDoor = (pos: Vec) =>
    tileAt(pos) === Tile.Wall &&
    neighborsAt(pos).filter(n => n === Tile.Empty).length > 1

  const cheats = {} as Record<string, number>

  for (let y = 1; y < grid.length - 1; y++) {
    for (let x = 1; x < grid[0].length - 1; x++) {
      if (isPossibleDoor({ x, y })) {
        const cheatGrid = grid.map(r => [...r])
        cheatGrid[y][x] = Tile.Empty

        cheats[`${x}:${y}`] =
          stepsWithoutCheats - findPath(cheatGrid, start, finish).step
      }
    }
  }
  return cheats
}

export function getCheatsOver(
  picoseconds: number,
  grid: Grid,
  start: Vec,
  finish: Vec
): number {
  const cheats = calculateCheats(grid, start, finish)

  return Object.values(cheats).filter(v => v >= picoseconds).length
}

console.log(getCheatsOver(100, ...parseGrid(input)))
