import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day14.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty,
  Start,
  Rock,
  CurrentSand,
  LandedSand,
}

type Map = Tile[][]

type Vec = {
  x: number
  y: number
}

type Segment = [Vec, Vec]

type State = {
  map: Map
  currentSand: Vec | null
  start: Vec
  justLanded: boolean
  finished: boolean
}

export const vec = (x: number, y: number): Vec => ({ x, y })
export const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
export const multVec = (a: Vec, mult: number): Vec => ({
  x: a.x * mult,
  y: a.y * mult,
})
export const isEqVec = (a: Vec, b: Vec): boolean => a.x === b.x && a.y === b.y
export const getDownVec = (a: Vec): Vec => ({ x: a.x, y: a.y + 1 })
export const getDownLeftVec = (a: Vec): Vec => ({ x: a.x - 1, y: a.y + 1 })
export const getDownRightVec = (a: Vec): Vec => ({ x: a.x + 1, y: a.y + 1 })

export function parseSegments(line: string): Segment[] {
  const points = line.split(' -> ')
  const segments: string[] = []
  for (let i = 1; i < points.length; i++) {
    segments.push(`${points[i - 1]} -> ${points[i]}`)
  }
  return segments.map(seg => {
    const [from, to] = seg.split(' -> ').map(pos => pos.split(',').map(Number))
    return [
      {
        x: from[0],
        y: from[1],
      },
      {
        x: to[0],
        y: to[1],
      },
    ]
  })
}

export function parseRocks(str: string): Vec[] {
  const rocks = new Set<string>()
  for (let line of str.split('\n')) {
    const segments = parseSegments(line)
    for (let segment of segments) {
      const [from, to] = segment
      const step: Vec = {
        x: Math.sign(to.x - from.x),
        y: Math.sign(to.y - from.y),
      }
      let cur: Vec = { ...from }
      while (!isEqVec(cur, to)) {
        rocks.add(`${cur.x}:${cur.y}`)
        cur = sumVec(cur, step)
      }
      rocks.add(`${cur.x}:${cur.y}`)
    }
  }
  return [...rocks].map(r => {
    const [x, y] = r.split(':').map(Number)
    return { x, y }
  })
}

export function getBoundaries(entities: Vec[]): {
  topLeft: Vec
  bottomRight: Vec
} {
  const topLeft = {
    x: Math.min(...entities.map(e => e.x)),
    y: Math.min(...entities.map(e => e.y)),
  }
  const bottomRight = {
    x: Math.max(...entities.map(e => e.x)),
    y: Math.max(...entities.map(e => e.y)),
  }
  return { topLeft, bottomRight }
}

export function getSizeOfBoundaries(bounds: {
  topLeft: Vec
  bottomRight: Vec
}): Vec {
  return sumVec(
    sumVec(bounds.bottomRight, multVec(bounds.topLeft, -1)),
    vec(1, 1)
  )
}

export function buildMap(
  start: Vec,
  rocks: Vec[],
  offset: Vec,
  size: Vec
): Map {
  const map: Map = Array(size.y)
    .fill(null)
    .map(_ => [...Array(size.x).fill(Tile.Empty)])

  map[start.y - offset.y][start.x - offset.x] = Tile.Start

  for (let rock of rocks) {
    map[rock.y - offset.y][rock.x - offset.x] = Tile.Rock
  }
  return map
}

export function getStart(map: Map): Vec {
  for (let y in map) {
    for (let x in map[y]) {
      if (map[y][x] === Tile.Start) return vec(Number(x), Number(y))
    }
  }
  throw new Error('Start not found')
}

export function getTileAt(map: Map, coord: Vec): Tile | undefined {
  if (map[coord.y]) return map[coord.y][coord.x]
  return undefined
}

export function isSolid(tile: Tile): boolean {
  return tile === Tile.Rock || tile === Tile.LandedSand
}

export function nextStateUnpure(state: State): State {
  const map = state.map

  const getTile = (coord: Vec) => getTileAt(map, coord)

  if (state.finished) {
    // should not go here
    throw new Error('state is finished')
  }
  if (state.justLanded) {
    // skip 1 frame
    // (this is intended for visualization/animation)
    state.currentSand = null
    state.finished = false
    state.justLanded = false
    return state
  }
  if (state.currentSand === null) {
    // emit new sand
    const newSandPos = getDownVec(state.start)

    if (getTile(newSandPos) !== Tile.Empty)
      throw new Error(
        `Can\'t emit, tile not empty: ${JSON.stringify(newSandPos)}`
      )
    map[newSandPos.y][newSandPos.x] = Tile.CurrentSand
    state.currentSand = newSandPos
    state.finished = false
    state.justLanded = false
    return state
  }

  // check floors
  const { currentSand } = state
  const downTile = getTile(getDownVec(currentSand))
  const leftTile = getTile(getDownLeftVec(currentSand))
  const rightTile = getTile(getDownRightVec(currentSand))

  if (downTile === Tile.Empty) {
    // go down
    map[currentSand.y][currentSand.x] = Tile.Empty
    map[currentSand.y + 1][currentSand.x] = Tile.CurrentSand
    state.currentSand = getDownVec(currentSand)
    state.finished = false
    state.justLanded = false
    return state
  }
  if (leftTile === Tile.Empty) {
    // go left
    map[currentSand.y][currentSand.x] = Tile.Empty
    map[currentSand.y + 1][currentSand.x - 1] = Tile.CurrentSand
    state.currentSand = getDownLeftVec(currentSand)
    state.finished = false
    state.justLanded = false
    return state
  }
  if (rightTile === Tile.Empty) {
    // go right
    map[currentSand.y][currentSand.x] = Tile.Empty
    map[currentSand.y + 1][currentSand.x + 1] = Tile.CurrentSand
    state.currentSand = getDownRightVec(currentSand)
    state.finished = false
    state.justLanded = false
    return state
  }
  if (isSolid(downTile) && isSolid(leftTile) && isSolid(rightTile)) {
    // land
    map[currentSand.y][currentSand.x] = Tile.LandedSand
    state.currentSand = null
    state.finished = false
    state.justLanded = true
    return state
  }

  // finished
  map[currentSand.y][currentSand.x] = Tile.Empty
  state.finished = true
  state.currentSand = null
  state.justLanded = false
  return state
}

export function printMap(map: Map): void {
  console.log(
    map
      .map(row => row.join(''))
      .join('\n')
      .replace(/0/g, '⬛')
      .replace(/1/g, '🍺')
      .replace(/2/g, '🟦')
      .replace(/3/g, '🟡')
      .replace(/4/g, '🟨')
  )
}

export function simulateAndGetLandedCount(map: Map): number {
  const initialState = {
    map,
    start: getStart(map),
    currentSand: null,
    justLanded: false,
    finished: false,
  }
  let state = initialState
  while (!state.finished) {
    state = nextStateUnpure(state)
  }
  return state.map.flat().filter(t => t === Tile.LandedSand).length
}

const rocks = parseRocks(input)
const start = vec(500, 0)
const bounds = getBoundaries([...rocks, start])
const size = getSizeOfBoundaries(bounds)
const map = buildMap(start, rocks, bounds.topLeft, size)

console.log(simulateAndGetLandedCount(map))
