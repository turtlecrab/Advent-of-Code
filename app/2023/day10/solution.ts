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

export type Map = Tile[][]

export type Position = {
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

export function parseMap(input: string): Map {
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
  throw new Error('starting position not found')
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
  via?: Path
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
        const oldPath: Path = { ...path }

        path.length += 1
        path.pos = sum(path.pos, dirToVec(dir))
        path.prev = opposite(dir)
        path.via = oldPath
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
  return findLoop(parseMap(input))[0].length
}

function dirsToTile(...dirs: Dir[]): Tile {
  if (dirs.includes(Dir.Up)) {
    if (dirs.includes(Dir.Left)) {
      return Tile.UpLeft
    } else if (dirs.includes(Dir.Right)) {
      return Tile.UpRight
    } else if (dirs.includes(Dir.Down)) {
      return Tile.UpDown
    }
  } else if (dirs.includes(Dir.Down)) {
    if (dirs.includes(Dir.Left)) {
      return Tile.DownLeft
    }
    if (dirs.includes(Dir.Right)) {
      return Tile.DownRight
    }
  } else if (dirs.includes(Dir.Left) && dirs.includes(Dir.Right)) {
    return Tile.LeftRight
  }
  throw new Error(`bad dirs: ${dirs}`)
}

export function getCleanMap(input: string): Map {
  const map = parseMap(input)

  let [first, second] = findLoop(map)

  const newMap = map.map(row => row.map(_ => Tile.Ground))

  while (first && second) {
    newMap[first.pos.y][first.pos.x] = map[first.pos.y][first.pos.x]
    newMap[second.pos.y][second.pos.x] = map[second.pos.y][second.pos.x]

    first = first.via!
    second = second.via!
  }

  // get starting pos tile
  const start = getAnimalPosition(map)
  const dirs = Dirs.filter(dir => checkConnection(map, start, dir))

  newMap[start.y][start.x] = dirsToTile(...dirs)

  return newMap
}

enum Pixel {
  Empty,
  Wall,
  Water,
}

type PixelTile = [
  [Pixel, Pixel, Pixel],
  [Pixel, Pixel, Pixel],
  [Pixel, Pixel, Pixel]
]

export function tileToPixels(tile: Tile): PixelTile {
  switch (tile) {
    case Tile.UpDown:
      return [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
      ]
    case Tile.UpLeft:
      return [
        [0, 1, 0],
        [1, 1, 0],
        [0, 0, 0],
      ]
    case Tile.UpRight:
      return [
        [0, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
      ]
    case Tile.DownLeft:
      return [
        [0, 0, 0],
        [1, 1, 0],
        [0, 1, 0],
      ]
    case Tile.DownRight:
      return [
        [0, 0, 0],
        [0, 1, 1],
        [0, 1, 0],
      ]
    case Tile.LeftRight:
      return [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
      ]
    case Tile.Ground:
      return [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],
      ]
    default:
      throw new Error(`bad tile: ${tile}`)
  }
}

export function getFloodFilledPixelMap(input: string) {
  const map = getCleanMap(input)

  // add empty border to the map
  // for flood fill to work properly
  map.forEach(row => {
    row.unshift(Tile.Ground)
    row.push(Tile.Ground)
  })
  const width = map[0].length

  map.unshift(Array(width).fill(Tile.Ground))
  map.push(Array(width).fill(Tile.Ground))

  const height = map.length

  // convert tiles to pixels
  const pixelMap: Pixel[][] = Array(height * 3)
    .fill(null)
    .map(_ => [])

  for (let y = 0; y < height; y++) {
    for (let tile of map[y]) {
      const pixels = tileToPixels(tile)
      pixelMap[y * 3].push(...pixels[0])
      pixelMap[y * 3 + 1].push(...pixels[1])
      pixelMap[y * 3 + 2].push(...pixels[2])
    }
  }

  // flood fill
  const pixelHeight = pixelMap.length
  const pixelWidth = pixelMap[0].length

  const stack = [[0, 0]]

  while (stack.length) {
    const [y, x] = stack.pop()!

    // boundary checks
    if (y < 0 || y >= pixelHeight || x < 0 || x > pixelWidth) continue

    // already filled check
    if (pixelMap[y][x] === Pixel.Water) continue

    // wall check
    if (pixelMap[y][x] === Pixel.Wall) continue

    // fill
    pixelMap[y][x] = Pixel.Water

    // expand
    stack.push([y - 1, x])
    stack.push([y, x - 1])
    stack.push([y, x + 1])
    stack.push([y + 1, x])
  }

  return pixelMap
}

export function isEmptyPixels3x3(map: Pixel[][], y: number, x: number) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (map[y + i][x + j] !== Pixel.Empty) return false
    }
  }
  return true
}

export function getEnclosedTilesCount(input: string) {
  const map = getFloodFilledPixelMap(input)

  let count = 0

  for (let y = 0; y < map.length; y += 3) {
    for (let x = 0; x < map[y].length; x += 3) {
      if (isEmptyPixels3x3(map, y, x)) count += 1
    }
  }
  return count
}

export function asciiArt(char: string): string {
  const map = {
    '7': '┐',
    L: '└',
    '-': '─',
    J: '┘',
    F: '┌',
    '|': '│',
  }
  if (char in map) return map[char as keyof typeof map]
  return char
}
