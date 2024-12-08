import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day08.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
const multiplyVec = (n: number, v: Vec) => ({ x: n * v.x, y: n * v.y })

const key = (pos: Vec) => `${pos.x},${pos.y}`
const posFromKey = (s: string): Vec => {
  const [x, y] = s.split(',').map(Number)
  return { x, y }
}

type GridData = {
  map: Map<string, Set<string>>
  w: number
  h: number
}

export function parseMap(input: string): GridData {
  const map = new Map<string, Set<string>>()

  const lines = input.split('\n')

  const w = lines[0].length
  const h = lines.length

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const tile = lines[y][x]
      if (tile === '.') continue

      if (map.has(tile)) {
        map.get(tile).add(key({ x, y }))
      } else {
        map.set(tile, new Set([key({ x, y })]))
      }
    }
  }
  return { map, w, h }
}

export function getPairCombinations<T>(list: Iterable<T>) {
  const arr = [...list]
  const pairs: [T, T][] = []

  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      pairs.push([arr[i], arr[j]])
    }
  }
  return pairs
}

export function getPossibleAntinodeLocations(
  aKey: string,
  bKey: string
): string[] {
  const aPos = posFromKey(aKey)
  const bPos = posFromKey(bKey)
  const p1 = sumVec(multiplyVec(2, bPos), multiplyVec(-1, aPos)) // 2 * b - a
  const p2 = sumVec(multiplyVec(2, aPos), multiplyVec(-1, bPos)) // 2 * a - b

  return [key(p1), key(p2)]
}

export function isPositionInBounds(pos: Vec, w: number, h: number): boolean {
  return pos.x >= 0 && pos.y >= 0 && pos.x < w && pos.y < h
}

export function getAntinodeCount({ map, w, h }: GridData): number {
  const locations = new Set<string>()

  for (let [, positions] of map) {
    const pairs = getPairCombinations(positions)

    for (let pair of pairs) {
      const antinodes = getPossibleAntinodeLocations(...pair).filter(key =>
        isPositionInBounds(posFromKey(key), w, h)
      )
      antinodes.forEach(antinode => locations.add(antinode))
    }
  }
  return locations.size
}

export function getLineAntinodes(
  aKey: string,
  bKey: string,
  w: number,
  h: number
): string[] {
  const a = posFromKey(aKey)
  const b = posFromKey(bKey)

  const points: string[] = []

  const _dx = b.x - a.x
  const _dy = b.y - a.y

  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
  const divider = gcd(_dx, _dy)

  const dx = _dx / divider
  const dy = _dy / divider

  let current = a

  while (isPositionInBounds(current, w, h)) {
    points.push(key(current))
    current = sumVec(current, { x: dx, y: dy })
  }

  current = a

  while (isPositionInBounds(current, w, h)) {
    points.push(key(current))
    current = sumVec(current, { x: -dx, y: -dy })
  }

  return points
}

export function getAntinodeCount2({ map, w, h }: GridData) {
  const locations = new Set<string>()

  for (let [, positions] of map) {
    const pairs = getPairCombinations(positions)

    for (let pair of pairs) {
      getLineAntinodes(...pair, w, h).forEach(antinode =>
        locations.add(antinode)
      )
    }
  }
  return locations.size
}

console.log(getAntinodeCount(parseMap(input)))
console.log(getAntinodeCount2(parseMap(input)))
