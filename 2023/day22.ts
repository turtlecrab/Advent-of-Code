import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day22.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
  z: number
}

type Brick = [Position, Position]

export function parseSortedBricks(input: string) {
  return input
    .split('\n')
    .map(line =>
      line
        .split('~')
        .map(cube => cube.split(',').map(Number))
        .map(p => ({ x: p[0], y: p[1], z: p[2] }))
        .sort((a, b) => a.z - b.z)
    )
    .sort(
      (a, b) => Math.min(b[0].z, b[1].z) - Math.min(a[0].z, a[1].z)
    ) as Brick[]
}

export function getAllCubes(brick: Brick): Position[] {
  if (brick[0].z !== brick[1].z) {
    const [min, max] = [brick[0].z, brick[1].z] // already sorted
    return Array(max - min + 1)
      .fill(null)
      .map((_, i) => ({ x: brick[0].x, y: brick[0].y, z: min + i }))
  }

  if (brick[0].x !== brick[1].x) {
    const [min, max] = [brick[0].x, brick[1].x].sort((a, b) => a - b)
    return Array(max - min + 1)
      .fill(null)
      .map((_, i) => ({ x: min + i, y: brick[0].y, z: brick[0].z }))
  }

  const [min, max] = [brick[0].y, brick[1].y].sort((a, b) => a - b)
  return Array(max - min + 1)
    .fill(null)
    .map((_, i) => ({ x: brick[0].x, y: min + i, z: brick[0].z }))
}

export function getBottomSurface(brick: Brick): Position[] {
  if (brick[0].z !== brick[1].z) return [{ ...brick[0] }]
  return getAllCubes(brick)
}

export function getPosBelow(pos: Position): Position {
  return { ...pos, z: pos.z - 1 }
}

export function fall(bricks: Brick[]) {
  const landedBricks: Brick[] = []
  const supports: Set<Brick>[] = []

  const landedCubes = new Map<string, Brick>()
  const key = (pos: Position) => `${pos.x},${pos.y},${pos.z}`

  while (bricks.length) {
    const cur = bricks.pop()

    const bottomSurface = getBottomSurface(cur)

    const curSupports = new Set<Brick>()

    for (let z = cur[0].z; z > 0; z--) {
      for (let cube of bottomSurface) {
        const cubeBelow = getPosBelow({ ...cube, z })
        if (landedCubes.has(key(cubeBelow))) {
          curSupports.add(landedCubes.get(key(cubeBelow)))
        }
      }
      if (curSupports.size || z === 1) {
        landedBricks.push(cur)
        supports.push(curSupports)
        for (let cube of getAllCubes(cur)) {
          landedCubes.set(key(cube), cur)
        }
        break
      }
      cur[0].z -= 1
      cur[1].z -= 1
    }
  }
  const cantBeRemoved = new Set<Brick>()

  for (let curSupports of supports) {
    if (curSupports.size === 1) {
      cantBeRemoved.add(curSupports.keys().next().value)
    }
  }
  return landedBricks.length - cantBeRemoved.size
}

console.log(fall(parseSortedBricks(input)))
