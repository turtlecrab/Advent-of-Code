import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day04.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty = '.',
  Paper = '@',
}

type Pos = {
  x: number
  y: number
}

const allSides = [
  { x: 1, y: 0 },
  { x: -1, y: 0 },
  { x: 0, y: 1 },
  { x: 0, y: -1 },

  { x: 1, y: 1 },
  { x: -1, y: 1 },
  { x: -1, y: -1 },
  { x: 1, y: -1 },
]

const sumVec = (a: Pos, b: Pos): Pos => ({ x: a.x + b.x, y: a.y + b.y })

export function parseGrid(input: string) {
  return input.split('\n').map(line => [...line] as Tile[])
}

export function adjacentPapersCount(pos: Pos, grid: Tile[][]) {
  const tileAt = (pos: Pos) => grid[pos.y]?.[pos.x]

  return allSides.reduce(
    (acc, side) => acc + (tileAt(sumVec(pos, side)) === Tile.Paper ? 1 : 0),
    0
  )
}

export function countAccessiblePapers(grid: Tile[][]) {
  const tileAt = (pos: Pos) => grid[pos.y]?.[pos.x]
  let count = 0

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (
        tileAt({ x, y }) === Tile.Paper &&
        adjacentPapersCount({ x, y }, grid) < 4
      ) {
        count += 1
      }
    }
  }
  return count
}

export function pass(grid: Tile[][]) {
  const tileAt = (pos: Pos) => grid[pos.y]?.[pos.x]
  let removedCount = 0

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (
        tileAt({ x, y }) === Tile.Paper &&
        adjacentPapersCount({ x, y }, grid) < 4
      ) {
        grid[y][x] = Tile.Empty
        removedCount += 1
      }
    }
  }
  return removedCount
}

export function removeAll(grid: Tile[][]) {
  let allRemovedCount = 0

  while (true) {
    const removed = pass(grid)
    
    if (removed === 0) {
      return allRemovedCount
    }
    allRemovedCount += removed
  }
}

console.time('p1')
console.log(countAccessiblePapers(parseGrid(input)))
console.timeEnd('p1')

console.time('p2')
console.log(removeAll(parseGrid(input)))
console.timeEnd('p2')
