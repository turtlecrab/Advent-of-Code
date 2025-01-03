import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day18.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

type State = {
  pos: Vec
  step: number
  prev: State | null
}

const isVecEqual = (a: Vec, b: Vec) => a.x === b.x && a.y === b.y
const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
const dirs = [
  { x: 1, y: 0 },
  { x: 0, y: 1 },
  { x: -1, y: 0 },
  { x: 0, y: -1 },
]

export function getPath(finish: number, walls: string[]): State | null {
  const finishPos = { x: finish, y: finish }

  const isInBounds = (pos: Vec) =>
    pos.x >= 0 && pos.y >= 0 && pos.x <= finish && pos.y <= finish

  const isEmpty = (pos: Vec, walls: string[]) =>
    !walls.includes(`${pos.x},${pos.y}`)

  const visited = new Set<string>()
  const key = (pos: Vec) => `${pos.x}:${pos.y}`

  const start: State = {
    pos: { x: 0, y: 0 },
    step: 0,
    prev: null,
  }

  const queue: State[] = [start]

  while (queue.length) {
    const cur = queue.shift()

    if (isVecEqual(cur.pos, finishPos)) {
      return cur
    }

    if (visited.has(key(cur.pos))) continue

    if (!isInBounds(cur.pos)) continue

    if (!isEmpty(cur.pos, walls)) continue

    for (let dir of dirs) {
      queue.push({
        pos: sumVec(cur.pos, dir),
        step: cur.step + 1,
        prev: cur,
      })
    }
    visited.add(key(cur.pos))
  }

  return null
}

export function getBlockingWall(finish: number, walls: string[]): string {
  let freeIdx = -1
  let blockedIdx = walls.length

  while (true) {
    if (blockedIdx === freeIdx + 1) {
      return walls[freeIdx]
    }
    const middleIdx = Math.floor((blockedIdx + freeIdx) / 2)

    const path = getPath(finish, walls.slice(0, middleIdx))

    if (path) {
      freeIdx = middleIdx
    } else {
      blockedIdx = middleIdx
    }
  }
}

console.log(getPath(70, input.split('\n').slice(0, 1024))?.step)
console.log(getBlockingWall(70, input.split('\n')))
