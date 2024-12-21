import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day15.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })

enum Dir {
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
}

const dirs = [Dir.Up, Dir.Right, Dir.Down, Dir.Left]

const dirVec: Record<Dir, Vec> = {
  [Dir.Up]: { x: 0, y: -1 },
  [Dir.Right]: { x: 1, y: 0 },
  [Dir.Down]: { x: 0, y: 1 },
  [Dir.Left]: { x: -1, y: 0 },
}

enum Tile {
  Empty = '.',
  Wall = '#',
  Box = 'O',
}

type Grid = Tile[][]

type Robot = {
  pos: Vec
  moves: Dir[]
}

export function parseAll(input: string): [Grid, Robot] {
  const [map, moves] = input.split('\n\n')

  const grid: Grid = []
  const pos: Vec = { x: 0, y: 0 }

  const lines = map.split('\n')

  for (let y = 0; y < lines.length; y++) {
    const row = []
    for (let x = 0; x < lines[0].length; x++) {
      let tile = lines[y][x]

      if (tile === '@') {
        pos.x = x
        pos.y = y
        tile = Tile.Empty
      }
      row.push(tile)
    }
    grid.push(row)
  }
  return [
    grid,
    {
      pos,
      moves: moves.split('').filter(m => dirs.includes(m as Dir)) as Dir[],
    },
  ]
}

const copyGrid = (grid: Grid) => grid.map(row => [...row])

export function getNextState(grid: Grid, pos: Vec, dir: Dir): [Grid, Vec] {
  const nextPos = sumVec(pos, dirVec[dir])

  const tileAt = (pos: Vec) => grid[pos.y][pos.x]

  if (tileAt(nextPos) === Tile.Empty) {
    return [grid, nextPos]
  }
  if (tileAt(nextPos) === Tile.Wall) {
    return [grid, pos]
  }

  if (tileAt(nextPos) === Tile.Box) {
    let nextEmptyPos = nextPos

    while (tileAt(nextEmptyPos) === Tile.Box) {
      nextEmptyPos = sumVec(nextEmptyPos, dirVec[dir])
    }

    if (tileAt(nextEmptyPos) === Tile.Wall) {
      return [grid, pos]
    }

    const nextGrid = copyGrid(grid)

    nextGrid[nextPos.y][nextPos.x] = Tile.Empty
    nextGrid[nextEmptyPos.y][nextEmptyPos.x] = Tile.Box

    return [nextGrid, nextPos]
  }

  throw new Error("shouldn't go here")
}

export function play(grid: Grid, { pos, moves }: Robot): [Grid, Vec] {
  while (moves.length) {
    const move = moves.shift()
    ;[grid, pos] = getNextState(grid, pos, move)
  }
  return [grid, pos]
}

export function getCoordinateSum(grid: Grid): number {
  let sum = 0

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (grid[y][x] === Tile.Box) {
        sum += 100 * y + x
      }
    }
  }
  return sum
}

console.log(getCoordinateSum(play(...parseAll(input))[0]))
