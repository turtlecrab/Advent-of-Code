import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day23.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

export enum Direction {
  Up,
  Down,
  Left,
  Right,
}

export type Elves = Set<string> // 'x:y'

export function parseElves(str: string): Elves {
  const elves: Elves = new Set<string>()
  str.split('\n').forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '#') elves.add(`${x}:${y}`)
    }
  })
  return elves
}

export function hasNeighbors(
  elf: string,
  elves: Elves
): [boolean, boolean, boolean, boolean] {
  const [x, y] = elf.split(':').map(Number)
  const up =
    elves.has(`${x - 1}:${y - 1}`) ||
    elves.has(`${x}:${y - 1}`) ||
    elves.has(`${x + 1}:${y - 1}`)
  const down =
    elves.has(`${x - 1}:${y + 1}`) ||
    elves.has(`${x}:${y + 1}`) ||
    elves.has(`${x + 1}:${y + 1}`)
  const left =
    elves.has(`${x - 1}:${y - 1}`) ||
    elves.has(`${x - 1}:${y}`) ||
    elves.has(`${x - 1}:${y + 1}`)
  const right =
    elves.has(`${x + 1}:${y - 1}`) ||
    elves.has(`${x + 1}:${y}`) ||
    elves.has(`${x + 1}:${y + 1}`)

  return [up, down, left, right]
}

export function getNextElfPos(elf: string, dir: Direction): string {
  const [x, y] = elf.split(':').map(Number)
  if (dir === Direction.Up) return `${x}:${y - 1}`
  if (dir === Direction.Down) return `${x}:${y + 1}`
  if (dir === Direction.Left) return `${x - 1}:${y}`
  if (dir === Direction.Right) return `${x + 1}:${y}`
}

export function round(elves: Elves, startDir: Direction): Elves {
  elves = new Set(elves)

  // key: new position
  // value: array of all elves claiming that position
  const claims: { [key: string]: string[] } = {}

  // filling claims
  for (let elf of elves) {
    const neighbors = hasNeighbors(elf, elves)

    // if has some neighbors, but not from all sides
    if (neighbors.some(n => n) && !neighbors.every(n => n)) {
      let dir: Direction
      for (let i = 0; i < 4; i++) {
        const checkDir = (startDir + i) % 4
        if (!neighbors[checkDir]) {
          dir = checkDir
          break
        }
      }
      const claim = getNextElfPos(elf, dir)

      if (claim in claims) {
        claims[claim].push(elf)
      } else {
        claims[claim] = [elf]
      }
    }
    // if no neighbors or enclosed by them, do nothing
  }

  // making moves
  for (let [claim, claimingElves] of Object.entries(claims)) {
    if (claimingElves.length === 1) {
      const prevPosition = claimingElves[0]
      elves.delete(prevPosition)
      elves.add(claim)
    }
  }
  return elves
}

export function simulate(elves: Elves, rounds = 10): Elves {
  let dir: Direction = Direction.Up

  for (let i = 0; i < rounds; i++) {
    elves = round(elves, dir)
    dir = (dir + 1) % 4
  }
  return elves
}

export function getBounds(elves: Elves): { min: Position; max: Position } {
  const xs = [...elves].map(e => Number(e.split(':')[0]))
  const ys = [...elves].map(e => Number(e.split(':')[1]))
  return {
    min: { x: Math.min(...xs), y: Math.min(...ys) },
    max: { x: Math.max(...xs), y: Math.max(...ys) },
  }
}

export function getSquareArea(min: Position, max: Position): number {
  const width = max.x - min.x + 1
  const height = max.y - min.y + 1
  return width * height
}

export function getEmptiness(elves: Elves): number {
  const newElves = simulate(elves)
  const { min, max } = getBounds(newElves)
  const area = getSquareArea(min, max)

  return area - newElves.size
}

console.log(getEmptiness(parseElves(input)))
