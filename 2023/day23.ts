import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day23.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty = '.',
  Wall = '#',
  Visited = 'O',
  SlopeRight = '>',
  SlopeDown = 'v',
  SlopeUp = '^',
  SlopeLeft = '<',
}

type Position = {
  y: number
  x: number
}

type Grid = Tile[][]

type State = {
  grid: Grid
  pos: Position
}

export function parseMap(input: string): Grid {
  return input.split('\n').map(row => [...row] as Tile[])
}

const clone = (g: Grid) => g.map(row => [...row])
const isEqual = (a: Position, b: Position) => a.x === b.x && a.y === b.y

export function getPossibleMoves(pos: Position, grid: Grid): Position[] {
  const moves: Position[] = []
  if (pos.y > 0) {
    const up = grid[pos.y - 1][pos.x]
    if (up === Tile.Empty || up === Tile.SlopeUp) {
      moves.push({ y: pos.y - 1, x: pos.x })
    }
  }
  if (pos.y < grid.length - 1) {
    const down = grid[pos.y + 1][pos.x]
    if (down === Tile.Empty || down === Tile.SlopeDown) {
      moves.push({ y: pos.y + 1, x: pos.x })
    }
  }
  if (pos.x > 0) {
    const left = grid[pos.y][pos.x - 1]
    if (left === Tile.Empty || left === Tile.SlopeLeft) {
      moves.push({ y: pos.y, x: pos.x - 1 })
    }
  }
  if (pos.x < grid[0].length - 1) {
    const right = grid[pos.y][pos.x + 1]
    if (right === Tile.Empty || right === Tile.SlopeRight) {
      moves.push({ y: pos.y, x: pos.x + 1 })
    }
  }
  return moves
}

export function play(grid: Grid) {
  const start: Position = { y: 0, x: 1 }
  const finish: Position = { y: grid.length - 1, x: grid[0].length - 2 }

  const states = [{ grid, pos: start }]

  const finishedStates: State[] = []

  next: while (states.length) {
    const state = states.pop()

    while (!isEqual(state.pos, finish)) {
      state.grid[state.pos.y][state.pos.x] = Tile.Visited

      const moves = getPossibleMoves(state.pos, state.grid)

      if (moves.length == 0) {
        // dead end
        continue next
      }
      state.pos = moves[0]

      for (let move of moves.slice(1)) {
        const branch = clone(state.grid)
        states.push({ grid: branch, pos: move })
      }
    }
    finishedStates.push(state)
  }

  return finishedStates
}

export function countSteps(grid: Grid): number {
  return grid.reduce(
    (acc, row) => acc + row.filter(t => t === Tile.Visited).length,
    0
  )
}

export function getLongestPathLength(states: State[]): number {
  return Math.max(...states.map(state => countSteps(state.grid)))
}

console.log(getLongestPathLength(play(parseMap(input))))
