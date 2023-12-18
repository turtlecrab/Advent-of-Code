import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day18.input.txt', 'utf8')
  .replace(/\r/g, '')

type Dir = 'U' | 'D' | 'L' | 'R'

type Command = {
  dir: Dir
  len: number
  color: string
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

console.log(getTrenchVolume(dig(parseCommands(input))))
