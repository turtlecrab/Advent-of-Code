import { MinPriorityQueue } from 'datastructures-js'
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

const dirToVec: Record<Dir, Vec> = {
  [Dir.Up]: { x: 0, y: -1 },
  [Dir.Right]: { x: 1, y: 0 },
  [Dir.Down]: { x: 0, y: 1 },
  [Dir.Left]: { x: -1, y: 0 },
}

const step = (pos: Vec, dir: Dir) => sumVec(pos, dirToVec[dir])

enum Tile {
  Empty = '.',
  Wall = '#',
}

type Grid = Tile[][]

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

type Node = {
  pos: Vec
  dir: Dir
  score: number
  prev: Node | null
}

export function getAllLowestEndNodes(
  grid: Grid,
  start: Vec,
  finish: Vec
): Node[] {
  const visited = new Map<string, number>() // pos+dir => score
  const key = (pos: Vec, dir: Dir) => `${pos.x}:${pos.y}:${dir}`

  const isEmptyTile = (pos: Vec) => grid[pos.y]?.[pos.x] === Tile.Empty

  const endNodes: Node[] = []

  const startNode = {
    pos: start,
    dir: Dir.Right,
    score: 0,
    prev: null,
  }

  const nodes = new MinPriorityQueue<Node>(a => a.score)
  nodes.push(startNode)

  while (nodes.size()) {
    const cur = nodes.pop()

    if (isEquals(cur.pos, finish)) {
      endNodes.push(cur)
      continue
    }

    if (endNodes.length && cur.score > endNodes[0].score) {
      continue
    }

    if (
      isEmptyTile(step(cur.pos, nextLeftDir(cur.dir))) &&
      cur.score + SCORE_TURN <=
        (visited.get(key(cur.pos, nextLeftDir(cur.dir))) ?? Infinity)
    ) {
      nodes.push({
        pos: cur.pos,
        dir: nextLeftDir(cur.dir),
        score: cur.score + SCORE_TURN,
        prev: cur,
      })
      visited.set(key(cur.pos, nextLeftDir(cur.dir)), cur.score + SCORE_TURN)
    }

    if (
      isEmptyTile(step(cur.pos, nextRightDir(cur.dir))) &&
      cur.score + SCORE_TURN <=
        (visited.get(key(cur.pos, nextRightDir(cur.dir))) ?? Infinity)
    ) {
      nodes.push({
        pos: cur.pos,
        dir: nextRightDir(cur.dir),
        score: cur.score + SCORE_TURN,
        prev: cur,
      })
      visited.set(key(cur.pos, nextRightDir(cur.dir)), cur.score + SCORE_TURN)
    }

    if (
      isEmptyTile(step(cur.pos, cur.dir)) &&
      cur.score + SCORE_MOVE <=
        (visited.get(key(step(cur.pos, cur.dir), cur.dir)) ?? Infinity)
    ) {
      nodes.push({
        pos: step(cur.pos, cur.dir),
        dir: cur.dir,
        score: cur.score + SCORE_MOVE,
        prev: cur,
      })
      visited.set(key(step(cur.pos, cur.dir), cur.dir), cur.score + SCORE_MOVE)
    }
  }

  return endNodes
}

export function getLowestScore(grid: Grid, start: Vec, finish: Vec): number {
  return getAllLowestEndNodes(grid, start, finish)[0].score
}

export function getVisitedTilesCount(
  grid: Grid,
  start: Vec,
  finish: Vec
): number {
  const endNodes = getAllLowestEndNodes(grid, start, finish)

  const key = (pos: Vec) => `${pos.x}:${pos.y}`

  const visited = new Set<string>(
    endNodes.flatMap(node => {
      const path = [node]

      while (path.at(-1).prev) {
        path.push(path.at(-1).prev)
      }
      return path.map(n => key(n.pos))
    })
  )
  return visited.size
}

console.log(getLowestScore(...parseGrid(input)))
console.log(getVisitedTilesCount(...parseGrid(input)))
