import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day24.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
  z: number
}

type Hail = {
  pos: Vec
  vel: Vec
}

type Vec2d = {
  x: number
  y: number
}

export function parse(input: string): Hail[] {
  return input.split('\n').map(line => {
    const [pos, vel] = line.split(' @ ').map(vec => vec.split(', ').map(Number))
    return {
      pos: { x: pos[0], y: pos[1], z: pos[2] },
      vel: { x: vel[0], y: vel[1], z: vel[2] },
    }
  })
}

export function sum2d(a: Required<Vec2d>, b: Required<Vec2d>): Vec2d {
  return { x: a.x + b.x, y: a.y + b.y }
}

export function multiply2d(a: Required<Vec2d>, times: number): Vec2d {
  return { x: a.x * times, y: a.y * times }
}

export function getIntersection2d(
  a: Hail,
  b: Hail
): { pos: Vec2d; u: number; v: number } | null {
  // https://stackoverflow.com/questions/2931573/determining-if-two-rays-intersect

  const det = b.vel.x * a.vel.y - b.vel.y * a.vel.x
  if (det === 0) return null

  const dx = b.pos.x - a.pos.x
  const dy = b.pos.y - a.pos.y

  const u = (dy * b.vel.x - dx * b.vel.y) / det
  const v = (dy * a.vel.x - dx * a.vel.y) / det

  const intersection1 = sum2d(a.pos, multiply2d(a.vel, u))

  return {
    pos: intersection1,
    u,
    v,
  }
}

export function get2dIntersectionCount(
  hails: Hail[],
  min: number,
  max: number
) {
  let count = 0
  for (let i = 0; i < hails.length - 1; i++) {
    for (let j = i + 1; j < hails.length; j++) {
      const intersection = getIntersection2d(hails[i], hails[j])

      // parallel
      if (!intersection) continue
      // past
      if (intersection.u < 0 || intersection.v < 0) continue

      if (
        intersection.pos.x >= min &&
        intersection.pos.x <= max &&
        intersection.pos.y >= min &&
        intersection.pos.y <= max
      ) {
        count += 1
      }
    }
  }
  return count
}

console.log(
  get2dIntersectionCount(parse(input), 200000000000000, 400000000000000)
)
