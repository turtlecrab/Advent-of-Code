import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day06.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty = '.',
  Obstacle = '#',
}

type Grid = Tile[][]

type Vec = {
  y: number
  x: number
}

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

type Guard = {
  pos: Vec
  dir: Dir
}

type State = {
  grid: Grid
  guard: Guard
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })

export function parseState(input: string): State {
  const lines = input.split('\n')

  const grid: Grid = []
  const guard: Guard = { pos: { x: 0, y: 0 }, dir: Dir.Up }

  for (let row = 0; row < lines.length; row++) {
    grid.push([])

    for (let col = 0; col < lines[0].length; col++) {
      const tile = lines[row][col]

      grid[row].push(tile === Tile.Obstacle ? tile : Tile.Empty)

      if ((dirs as string[]).includes(tile)) {
        guard.pos = { x: col, y: row }
        guard.dir = tile as Dir
      }
    }
  }
  return { grid, guard }
}

export function getNextState({ grid, guard }: State): State {
  const nextPos = sumVec(guard.pos, dirVec[guard.dir])

  if (grid[nextPos.y]?.[nextPos.x] === Tile.Obstacle) {
    return getNextState({
      grid,
      guard: {
        ...guard,
        dir: dirs[(dirs.indexOf(guard.dir) + 1) % dirs.length],
      },
    })
  }
  return {
    grid,
    guard: {
      ...guard,
      pos: nextPos,
    },
  }
}

export function isGuardInBounds({ grid, guard }: State): boolean {
  return (
    guard.pos.x >= 0 &&
    guard.pos.y >= 0 &&
    guard.pos.x < grid[0].length &&
    guard.pos.y < grid.length
  )
}

export function getVisitedPositionCount(state: State): number {
  const visited = new Set<string>()
  const key = (pos: Vec) => `${pos.x},${pos.y}`

  while (isGuardInBounds(state)) {
    visited.add(key(state.guard.pos))
    state = getNextState(state)
  }
  return visited.size
}

console.log(getVisitedPositionCount(parseState(input)))
