import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day12.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })

enum Dir {
  Up,
  Down,
  Left,
  Right,
}

const dirs = [Dir.Up, Dir.Right, Dir.Down, Dir.Left]

const dirVec: Record<Dir, Vec> = {
  [Dir.Up]: { x: 0, y: -1 },
  [Dir.Right]: { x: 1, y: 0 },
  [Dir.Down]: { x: 0, y: 1 },
  [Dir.Left]: { x: -1, y: 0 },
}

export function parseGrid(input: string): string[][] {
  return input.split('\n').map(row => [...row])
}

export function getAreas(grid: string[][]) {
  const visited = new Set<string>()
  const key = (pos: Vec) => `${pos.x},${pos.y}`
  const tileAt = (pos: Vec) => grid[pos.y]?.[pos.x]

  const areas: Map<string, Set<Dir>>[] = []

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      if (visited.has(key({ x, y }))) continue

      const area = new Map<string, Set<Dir>>() // Pos => Walls

      const curTile = tileAt({ x, y })

      const stack = [{ x, y }]

      while (stack.length) {
        const curPos = stack.pop()

        const tileWalls = new Set<Dir>()

        area.set(key(curPos), tileWalls)
        visited.add(key(curPos))

        for (let dir of dirs) {
          const next = sumVec(curPos, dirVec[dir])

          if (tileAt(next) !== curTile) {
            tileWalls.add(dir)
            continue
          }
          if (visited.has(key(next))) continue

          stack.push(next)
        }
      }
      areas.push(area)
    }
  }
  return areas
}

export function getAreaPrice(area: Map<string, Set<Dir>>) {
  const values = [...area.values()].map(dirs => dirs.size)
  return values.length * values.reduce((a, b) => a + b)
}

export function getAreasTotalPrice(areas: Map<string, Set<Dir>>[]) {
  return areas.map(getAreaPrice).reduce((a, b) => a + b)
}

console.log(getAreasTotalPrice(getAreas(parseGrid(input))))
