import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day18.input.txt', 'utf8')
  .replace(/\r/g, '')

type Dir = 'U' | 'D' | 'L' | 'R'

type Command = {
  dir: Dir
  len: number
  color?: string
}

type Position = {
  x: number
  y: number
}

export function parseCommands(input: string): Command[] {
  return input.split('\n').map(line => {
    const [_, dir, len, color] = line.match(/^([UDLR]) (\d+) \((\S+)\)/)
    return {
      dir: dir as Dir,
      len: Number(len),
      color,
    }
  })
}

export function parseCommands2(input: string): Command[] {
  return input.split('\n').map(line => {
    const [_, color] = line.match(/\(#(\S+)\)/)

    const dir = ['R', 'D', 'L', 'U'][color.at(-1)] as Dir
    const len = parseInt(color.slice(0, color.length - 1), 16)

    return { dir, len }
  })
}

export function dig(commands: Command[]) {
  const trench = new Map<string, string>()
  const key = (pos: Position) => `${pos.x}:${pos.y}`

  const pos: Position = { x: 0, y: 0 }

  for (let cmd of commands) {
    for (let i = 0; i < cmd.len; i++) {
      switch (cmd.dir) {
        case 'U':
          pos.y -= 1
          break
        case 'D':
          pos.y += 1
          break
        case 'L':
          pos.x -= 1
          break
        case 'R':
          pos.x += 1
          break
      }
      trench.set(key(pos), cmd.color)
    }
  }
  return trench
}

export function gridFromTrench(trench: Map<string, string>) {
  const keys = [...trench.keys()]

  const sortedX = keys.map(k => Number(k.split(':')[0])).sort((a, b) => a - b)
  const sortedY = keys.map(k => Number(k.split(':')[1])).sort((a, b) => a - b)

  const minX = sortedX[0]
  const maxX = sortedX.at(-1)
  const minY = sortedY[0]
  const maxY = sortedY.at(-1)

  const grid: string[][] = Array(maxY - minY + 1)
    .fill(null)
    .map((_, y) => Array(maxX - minX + 1).fill('.'))

  keys.forEach(key => {
    const [x, y] = key.split(':').map(Number)
    grid[y - minY][x - minX] = '#'
  })
  return grid
}

export function expandGrid(grid: string[][]) {
  grid.forEach(row => {
    row.unshift('.')
    row.push('.')
  })
  grid.unshift(Array(grid[0].length).fill('.'))
  grid.push(Array(grid[0].length).fill('.'))

  return grid
}

export function getTrenchVolume(trench: Map<string, string>): number {
  const grid = gridFromTrench(trench)
  expandGrid(grid)

  // flood fill
  const stack: Position[] = [{ x: 0, y: 0 }]

  const visited = new Set<string>()
  const key = (pos: Position) => `${pos.x}:${pos.y}`

  while (stack.length) {
    const cur = stack.pop()

    if (
      cur.y < 0 ||
      cur.y >= grid.length ||
      cur.x < 0 ||
      cur.x >= grid[0].length
    )
      continue

    if (visited.has(key(cur))) continue

    if (grid[cur.y][cur.x] === '#') continue

    visited.add(key(cur))

    stack.push(
      { x: cur.x + 1, y: cur.y },
      { x: cur.x - 1, y: cur.y },
      { x: cur.x, y: cur.y + 1 },
      { x: cur.x, y: cur.y - 1 }
    )
  }
  return grid.length * grid[0].length - visited.size
}

export function getTrenchVolume2(commands: Command[]) {
  const pos: Position = { x: 0, y: 0 }

  const vertices: Position[] = [{ ...pos }]

  for (let cmd of commands) {
    if (cmd.dir === 'U') pos.y -= cmd.len
    else if (cmd.dir === 'D') pos.y += cmd.len
    else if (cmd.dir === 'L') pos.x -= cmd.len
    else if (cmd.dir === 'R') pos.x += cmd.len
    vertices.push({ ...pos })
  }

  let shoe = 0

  for (let i = 0; i < vertices.length - 1; i++) {
    shoe += vertices[i].x * vertices[i + 1].y
    shoe -= vertices[i].y * vertices[i + 1].x
  }

  shoe = Math.abs(shoe) / 2

  const length = commands.reduce((acc, cmd) => acc + cmd.len, 0)

  return shoe + length / 2 + 1
}

console.log(getTrenchVolume2(parseCommands(input)))

console.log(getTrenchVolume2(parseCommands2(input)))
