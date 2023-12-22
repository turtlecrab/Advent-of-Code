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

export function getTileAt(pos: Position, grid: Grid): Tile {
  const height = grid.length
  const width = grid[0].length
  let { y, x } = pos

  if (y >= height) y = y % height
  if (x >= width) x = x % width

  if (y < 0) y = ((y % height) + height) % height
  if (x < 0) x = ((x % width) + width) % width

  return grid[y][x]
}

export function nextPos(pos: Step, dir: Position, grid: Grid): Position | null {
  const next = { y: pos.y + dir.y, x: pos.x + dir.x }

  if (getTileAt(next, grid) === Tile.Rock) return null

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

export function calculateMagic(
  grid: Grid,
  start: Position,
  magicSteps: number
) {
  const fullSize = grid.length
  const halfishSize = (grid.length - 1) / 2

  console.log('----------')

  const innerDiamond = getEvenVisitedCount(play(grid, start, halfishSize))
  console.log('innerDiamond:', innerDiamond)

  const firstRingFilled = 92550
  //  getEvenVisitedCount(
  //   play(grid, start, halfishSize + 2 * fullSize)
  // )
  console.log('firstRingFilled:', firstRingFilled)

  const secondRingFilled = 300330
  //  getEvenVisitedCount(
  //   play(grid, start, halfishSize + 4 * fullSize)
  // )
  console.log('secondRingFilled:', secondRingFilled)

  const thirdRingFilled = 626998
  //  getEvenVisitedCount(
  //   play(grid, start, halfishSize + 6 * fullSize)
  // )
  console.log('thirdRingFilled:', thirdRingFilled)

  const fourthRingFilled = 1072554
  // getEvenVisitedCount(
  //   play(grid, start, halfishSize + 8 * fullSize)
  // )
  console.log('fourthRingFilled:', fourthRingFilled)

  const fifthRingFilled = 1636998
  //  getEvenVisitedCount(
  //   play(grid, start, halfishSize + 10 * fullSize)
  // )
  console.log('fifthRingFilled:', fifthRingFilled)

  const firstRing = firstRingFilled - innerDiamond
  const secondRing = secondRingFilled - firstRingFilled
  const thirdRing = thirdRingFilled - secondRingFilled
  const fourthRing = fourthRingFilled - thirdRingFilled
  const fifthRing = fifthRingFilled - fourthRingFilled

  console.log('----------')
  console.log('firstRing:', firstRing)
  console.log('----------')

  console.log('firstRing - innerDiamond:', firstRing - innerDiamond)
  console.log('secondRing - firstRing:', secondRing - firstRing)
  console.log('thirdRing - secondRing:', thirdRing - secondRing)
  console.log('fourthRing - thirdRing:', fourthRing - thirdRing)
  console.log('fifthRing - fourthRing:', fifthRing - fourthRing)

  const diffDoubleRing = secondRing - firstRing
  const ringsAmount = (magicSteps - halfishSize) / fullSize

  console.log('----------')

  console.log('rings amount:', ringsAmount)

  console.log('----------')

  let n = ringsAmount / 2

  console.log('ringsAmount / 2:', n)
  console.log('----------')

  console.log(
    'ANSWER?:',
    innerDiamond + firstRing * n + (diffDoubleRing * ((n - 1) * n)) / 2
  )

  n = 1
  const nn1 =
    innerDiamond + firstRing * n + (diffDoubleRing * ((n - 1) * n)) / 2
  n = 2
  const nn2 =
    innerDiamond + firstRing * n + (diffDoubleRing * ((n - 1) * n)) / 2
  n = 3
  const nn3 =
    innerDiamond + firstRing * n + (diffDoubleRing * ((n - 1) * n)) / 2
  n = 4
  const nn4 =
    innerDiamond + firstRing * n + (diffDoubleRing * ((n - 1) * n)) / 2
  n = 5
  const nn5 =
    innerDiamond + firstRing * n + (diffDoubleRing * ((n - 1) * n)) / 2

  console.log(nn1)
  console.log(nn2)
  console.log(nn3)
  console.log(nn4)
  console.log(nn5)

  // 613636831549858 too high
  // 613636831546200 too high
  // 608234666562600 not right
  // 608234666566258
  // 608193713358858

  // 9007199254740991 - max
}

// console.log(getEvenVisitedCount(play(...parseMap(input))))

const [grid, start] = parseMap(input)

calculateMagic(grid, start, 26501365)

// calculateMagic(grid, start, 65 + 131 * 10)
