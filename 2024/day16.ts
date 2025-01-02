import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day16.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
const isEquals = (a: Vec, b: Vec) => a.x === b.x && a.y === b.y

enum Dir {
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
}

const dirs = [Dir.Up, Dir.Right, Dir.Down, Dir.Left]

const modulo = (n: number, d: number) => ((n % d) + d) % d

const nextLeftDir = (dir: Dir) =>
  dirs[modulo(dirs.indexOf(dir) - 1, dirs.length)]
const nextRightDir = (dir: Dir) =>
  dirs[modulo(dirs.indexOf(dir) + 1, dirs.length)]

const dirVec: Record<Dir, Vec> = {
  [Dir.Up]: { x: 0, y: -1 },
  [Dir.Right]: { x: 1, y: 0 },
  [Dir.Down]: { x: 0, y: 1 },
  [Dir.Left]: { x: -1, y: 0 },
}

enum Tile {
  Empty = '.',
  Wall = '#',
}

type Grid = Tile[][]

const isEmptyTile = (pos: Vec, grid: Grid) =>
  grid[pos.y]?.[pos.x] === Tile.Empty

const SCORE_MOVE = 1
const SCORE_TURN = 1000

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

export function getLowestScore(grid: Grid, start: Vec, finish: Vec): number {
  const visited = new Set<string>()
  const key = (pos: Vec, dir: Dir) => `${pos.x}:${pos.y}:${dir}`

  const startNode = {
    pos: start,
    dir: Dir.Right,
    score: 0,
  }

  const nodes = [startNode]

  while (nodes.length) {
    const cur = nodes.sort((a, b) => b.score - a.score).pop()

    if (isEquals(cur.pos, finish)) {
      return cur.score
    }

    if (!visited.has(key(cur.pos, nextLeftDir(cur.dir)))) {
      nodes.push({
        pos: cur.pos,
        dir: nextLeftDir(cur.dir),
        score: cur.score + SCORE_TURN,
      })
      visited.add(key(cur.pos, nextLeftDir(cur.dir)))
    }

    if (!visited.has(key(cur.pos, nextRightDir(cur.dir)))) {
      nodes.push({
        pos: cur.pos,
        dir: nextRightDir(cur.dir),
        score: cur.score + SCORE_TURN,
      })
      visited.add(key(cur.pos, nextRightDir(cur.dir)))
    }

    if (isEmptyTile(sumVec(cur.pos, dirVec[cur.dir]), grid)) {
      nodes.push({
        pos: sumVec(cur.pos, dirVec[cur.dir]),
        dir: cur.dir,
        score: cur.score + SCORE_MOVE,
      })
      visited.add(key(cur.pos, nextRightDir(cur.dir)))
    }
  }

  return Infinity
}

console.log(getLowestScore(...parseGrid(input)))
