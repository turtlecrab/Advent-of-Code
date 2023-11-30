import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day24.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Direction {
  Up = '^',
  Down = 'v',
  Left = '<',
  Right = '>',
}

export type Position = {
  x: number
  y: number
}

export type Blizzards = Direction[][][]

export type State = {
  steps: number
  pos: Position
  via: State | null
}

export function parseBlizzards(str: string): Blizzards {
  const crop = str
    .split('\n')
    .slice(1, -1)
    .map(line => line.slice(1, -1))

  const blizzards: Blizzards = Array(crop.length)
    .fill(null)
    .map(r =>
      Array(crop[0].length)
        .fill(null)
        .map(el => [])
    )

  for (let y = 0; y < crop.length; y++) {
    for (let x = 0; x < crop[0].length; x++) {
      const cur = crop[y][x]
      if (/[><\^v]/.test(cur)) {
        blizzards[y][x] = [cur as Direction]
      }
    }
  }
  return blizzards
}

export function getNext(blizzards: Blizzards): Blizzards {
  const height = blizzards.length
  const width = blizzards[0].length

  const next: Blizzards = Array(height)
    .fill(null)
    .map(r =>
      Array(width)
        .fill(null)
        .map(el => [])
    )

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const cur = blizzards[y][x]
      for (let dir of cur) {
        let dx = 0,
          dy = 0
        if (dir === Direction.Up) {
          dy = -1
        } else if (dir === Direction.Down) {
          dy = 1
        } else if (dir === Direction.Left) {
          dx = -1
        } else if (dir === Direction.Right) {
          dx = 1
        }
        next[(y + dy + height) % height][(x + dx + width) % width].push(dir)
      }
    }
  }
  return next
}

/**
 * should recieve memo with at least starting state at memo[0]
 */
export function getBlizzardsAt(depth: number, memo: Blizzards[]): Blizzards {
  if (memo.length === 0) throw new Error('provide starting state')
  if (memo[depth]) return memo[depth]

  memo[depth] = getNext(getBlizzardsAt(depth - 1, memo))
  return memo[depth]
}

export function move(pos: Position, dir: Direction): Position {
  if (dir === Direction.Up) return { x: pos.x, y: pos.y - 1 }
  if (dir === Direction.Down) return { x: pos.x, y: pos.y + 1 }
  if (dir === Direction.Left) return { x: pos.x - 1, y: pos.y }
  if (dir === Direction.Right) return { x: pos.x + 1, y: pos.y }
}

export function play(
  blizzards: Blizzards,
  start?: Position,
  finish?: Position
): State {
  const height = blizzards.length
  const width = blizzards[0].length

  start = start || { x: 0, y: -1 }
  finish = finish || { x: width - 1, y: height }

  const moves = [
    [1, 0],
    [0, 1],
    [0, 0],
    [0, -1],
    [-1, 0],
  ]

  const queue: State[] = []
  const memo = [blizzards]

  queue.push({
    steps: 0,
    pos: start,
    via: null,
  })

  while (queue.length) {
    const state = queue.shift()
    const { pos, steps } = state

    if (pos.x === finish.x && pos.y === finish.y) {
      return state
    }

    const next = getBlizzardsAt(steps + 1, memo)

    for (let [x, y] of moves) {
      if (
        ((pos.x + x === start.x && pos.y + y === start.y) ||
          (pos.x + x === finish.x && pos.y + y === finish.y) ||
          (pos.x + x >= 0 &&
            pos.x + x < width &&
            pos.y + y >= 0 &&
            pos.y + y < height &&
            next[pos.y + y][pos.x + x].length === 0)) &&
        // TODO: optimize?
        queue.findIndex(
          el =>
            el.steps === steps + 1 &&
            el.pos.x === pos.x + x &&
            el.pos.y === pos.y + y
        ) === -1
      ) {
        queue.push({
          steps: steps + 1,
          pos: { x: pos.x + x, y: pos.y + y },
          via: state,
        })
      }
    }
  }
}

const blizzards = parseBlizzards(input)
const finished = play(blizzards)

// part 1
console.log(finished.steps)

const finishedBlizzards = getBlizzardsAt(finished.steps, [blizzards])
const backToSnacks = play(finishedBlizzards, finished.pos, { x: 0, y: -1 })

const snacksBlizzards = getBlizzardsAt(finished.steps + backToSnacks.steps, [
  blizzards,
])
const finishedWithSnacks = play(snacksBlizzards)

// part 2
console.log(finished.steps + backToSnacks.steps + finishedWithSnacks.steps)
