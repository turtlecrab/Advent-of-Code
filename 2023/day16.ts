import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day16.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty = '.',
  MirrorUpLeft = '\\',
  MirrorUpRight = '/',
  SplitterV = '|',
  SplitterH = '-',
}

export enum Dir {
  Up,
  Down,
  Left,
  Right,
}

type Cell = {
  tile: Tile
  beamDirs: Set<Dir>
}

type Position = {
  y: number
  x: number
}

type Beam = {
  pos: Position
  dir: Dir
  ended?: boolean
}

export type Layout = Cell[][]

export function parseMap(input: string): Layout {
  return input
    .split('\n')
    .map(line =>
      line
        .split('')
        .map(char => ({ tile: char as Tile, beamDirs: new Set<Dir>() }))
    )
}

export function step(pos: Position, dir: Dir, map: Layout): Position | null {
  let next: Position
  if (dir === Dir.Up) {
    next = { y: pos.y - 1, x: pos.x }
  } else if (dir === Dir.Down) {
    next = { y: pos.y + 1, x: pos.x }
  } else if (dir === Dir.Left) {
    next = { y: pos.y, x: pos.x - 1 }
  } else if (dir === Dir.Right) {
    next = { y: pos.y, x: pos.x + 1 }
  }
  if (
    next.y < 0 ||
    next.y >= map.length ||
    next.x < 0 ||
    next.x >= map[0].length
  ) {
    return null
  }
  return next
}

export function getDirAfterMirror(
  dir: Dir,
  mirror: Tile.MirrorUpLeft | Tile.MirrorUpRight
): Dir {
  if (mirror === Tile.MirrorUpLeft) {
    if (dir === Dir.Up) return Dir.Left
    if (dir === Dir.Down) return Dir.Right
    if (dir === Dir.Left) return Dir.Up
    if (dir === Dir.Right) return Dir.Down
  }
  if (mirror === Tile.MirrorUpRight) {
    if (dir === Dir.Up) return Dir.Right
    if (dir === Dir.Down) return Dir.Left
    if (dir === Dir.Left) return Dir.Down
    if (dir === Dir.Right) return Dir.Up
  }
}

export function getDirsAfterSplitter(
  dir: Dir,
  splitter: Tile.SplitterH | Tile.SplitterV
): Dir[] {
  if (splitter === Tile.SplitterH) {
    if (dir === Dir.Left || dir === Dir.Right) return [dir]
    return [Dir.Left, Dir.Right]
  }
  if (splitter === Tile.SplitterV) {
    if (dir === Dir.Up || dir === Dir.Down) return [dir]
    return [Dir.Up, Dir.Down]
  }
}

export function simulate(
  map: Layout,
  startBeam: Beam = {
    pos: { y: 0, x: -1 },
    dir: Dir.Right,
  }
): Layout {
  map.forEach(row => row.forEach(cell => cell.beamDirs.clear()))

  const beams: Beam[] = [startBeam]

  while (beams.some(b => !b.ended)) {
    const origLength = beams.length

    for (let i = 0; i < origLength; i++) {
      const beam = beams[i]

      if (beam.ended) continue

      const nextPos = step(beam.pos, beam.dir, map)
      if (!nextPos) {
        beam.ended = true
        continue
      }

      const nextCell = map[nextPos.y][nextPos.x]
      if (nextCell.beamDirs.has(beam.dir)) {
        beam.ended = true
        continue
      }

      nextCell.beamDirs.add(beam.dir)

      switch (nextCell.tile) {
        case Tile.Empty:
          beam.pos = nextPos
          break
        case Tile.MirrorUpLeft:
        case Tile.MirrorUpRight:
          beam.pos = nextPos
          beam.dir = getDirAfterMirror(beam.dir, nextCell.tile)
          break
        case Tile.SplitterH:
        case Tile.SplitterV:
          const nextDirs = getDirsAfterSplitter(beam.dir, nextCell.tile)
          beam.pos = nextPos
          beam.dir = nextDirs[0]
          if (nextDirs[1]) {
            beams.push({ pos: nextPos, dir: nextDirs[1] })
          }
      }
    }
  }
  return map
}

export function getEnergizedTilesCount(map: Layout): number {
  return map
    .flatMap(row => row.map(cell => cell.beamDirs.size > 0))
    .filter(Boolean).length
}

export function getMaxTilesCount(map: Layout): number {
  const height = map.length
  const width = map[0].length

  const startBeams: Beam[] = []

  for (let i = 0; i < width; i++) {
    startBeams.push({ pos: { y: -1, x: i }, dir: Dir.Down })
    startBeams.push({ pos: { y: height, x: i }, dir: Dir.Up })
  }
  for (let i = 0; i < height; i++) {
    startBeams.push({ pos: { y: i, x: -1 }, dir: Dir.Right })
    startBeams.push({ pos: { y: i, x: width }, dir: Dir.Left })
  }
  return Math.max(
    ...startBeams.map(beam => getEnergizedTilesCount(simulate(map, beam)))
  )
}

console.log(getEnergizedTilesCount(simulate(parseMap(input))))

console.log(getMaxTilesCount(parseMap(input)))
