import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day10.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  UpDown = '|',
  LeftRight = '-',
  UpRight = 'L',
  UpLeft = 'J',
  DownLeft = '7',
  DownRight = 'F',
  Ground = '.',
  Animal = 'S',
}

type Map = Tile[][]

type Position = {
  y: number
  x: number
}

enum Dir {
  Up,
  Down,
  Left,
  Right,
}

const Dirs = [Dir.Up, Dir.Down, Dir.Left, Dir.Right]

const dirToVec = (dir: Dir): Position =>
  [
    { y: -1, x: 0 },
    { y: 1, x: 0 },
    { y: 0, x: -1 },
    { y: 0, x: 1 },
  ][dir]

function sum(a: Position, b: Position): Position {
  return { x: a.x + b.x, y: a.y + b.y }
}

function opposite(dir: Dir) {
  switch (dir) {
    case Dir.Up:
      return Dir.Down
    case Dir.Down:
      return Dir.Up
    case Dir.Left:
      return Dir.Right
    case Dir.Right:
      return Dir.Left
    default:
      throw new Error("shouldn't go here")
  }
}

function isEqual(a: Position, b: Position) {
  return a.x === b.x && a.y === b.y
}

function anotherEnd(tile: Tile, prev: Dir): Dir {
  switch (tile) {
    case Tile.UpDown:
      if (prev === Dir.Up) return Dir.Down
      if (prev === Dir.Down) return Dir.Up
      break
    case Tile.LeftRight:
      if (prev === Dir.Left) return Dir.Right
      if (prev === Dir.Right) return Dir.Left
      break
    case Tile.UpLeft:
      if (prev === Dir.Up) return Dir.Left
      if (prev === Dir.Left) return Dir.Up
      break
    case Tile.UpRight:
      if (prev === Dir.Up) return Dir.Right
      if (prev === Dir.Right) return Dir.Up
      break
    case Tile.DownLeft:
      if (prev === Dir.Down) return Dir.Left
      if (prev === Dir.Left) return Dir.Down
      break
    case Tile.DownRight:
      if (prev === Dir.Down) return Dir.Right
      if (prev === Dir.Right) return Dir.Down
      break
  }
  throw new Error("shouldn't go here")
}

export function parse(input: string): Map {
  return input.split('\n').map(line =>
    line.split('').map(char => {
      if (!Object.values(Tile).includes(char as Tile)) {
        throw new Error(`parsing error: ${char}`)
      }
      return char as Tile
    })
  )
}

export function getAnimalPosition(map: Map): Position {
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === Tile.Animal) return { y, x }
    }
  }
}

export function checkConnection(map: Map, from: Position, dir: Dir) {
  const to = sum(from, dirToVec(dir))

  if (to.y < 0 || to.y >= map.length || to.x < 0 || to.x >= map[0].length) {
    return false
  }

  const tile = map[to.y][to.x]

  if (dir === Dir.Up) {
    return (
      tile === Tile.UpDown || tile === Tile.DownLeft || tile === Tile.DownRight
    )
  }
  if (dir === Dir.Down) {
    return tile === Tile.UpDown || tile === Tile.UpLeft || tile === Tile.UpRight
  }
  if (dir === Dir.Left) {
    return (
      tile === Tile.LeftRight ||
      tile === Tile.UpRight ||
      tile === Tile.DownRight
    )
  }
  if (dir === Dir.Right) {
    return (
      tile === Tile.LeftRight || tile === Tile.UpLeft || tile === Tile.DownLeft
    )
  }
  throw new Error("shouldn't go here")
}

type Path = {
  length: number
  pos: Position
  prev: Dir
  ended?: boolean
}

export function checkPathsIntersection(paths: Path[]): [Path, Path] | null {
  for (let i = 0; i < paths.length - 1; i++) {
    for (let j = i + 1; j < paths.length; j++) {
      if (isEqual(paths[i].pos, paths[j].pos)) {
        return [paths[i], paths[j]]
      }
    }
  }
  return null
}

export function findLoop(map: Map): [Path, Path] {
  const start = getAnimalPosition(map)

  const paths: Path[] = []

  for (let dir of Dirs) {
    if (checkConnection(map, start, dir)) {
      paths.push({
        length: 1,
        pos: sum(start, dirToVec(dir)),
        prev: opposite(dir),
      })
    }
  }

  while (paths.some(path => !path.ended)) {
    for (let path of paths) {
      if (path.ended) continue

      const tile = map[path.pos.y][path.pos.x]
      const dir = anotherEnd(tile, path.prev)

      if (checkConnection(map, path.pos, dir)) {
        path.length += 1
        path.pos = sum(path.pos, dirToVec(dir))
        path.prev = opposite(dir)
      } else {
        path.ended = true
      }

      const intersection = checkPathsIntersection(paths)

      if (intersection) return intersection
    }
  }
  throw new Error('intersection not found')
}

export function getLongestLength(input: string): number {
  return findLoop(parse(input))[0].length
}

console.log(getLongestLength(input))
