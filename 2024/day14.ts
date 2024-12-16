import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day14.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

const sumVec = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y })
const multiplyVec = (n: number, v: Vec) => ({ x: n * v.x, y: n * v.y })

const modulo = (n: number, d: number) => ((n % d) + d) % d

type Robot = {
  pos: Vec
  vel: Vec
}

export function parseRobots(input: string): Robot[] {
  return input.split('\n').map(line => {
    const [, px, py, vx, vy] = line
      .match(/p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/)
      .map(Number)
    return { pos: { x: px, y: py }, vel: { x: vx, y: vy } }
  })
}

export function simulate(robot: Robot, size: Vec, steps: number): Robot {
  const nextPos = sumVec(robot.pos, multiplyVec(steps, robot.vel))

  nextPos.x = modulo(nextPos.x, size.x)
  nextPos.y = modulo(nextPos.y, size.y)

  return { pos: nextPos, vel: robot.vel }
}

export function getSafetyFactor(
  robots: Robot[],
  size: Vec,
  steps: number
): number {
  return robots
    .map(robot => simulate(robot, size, steps))
    .filter(
      robot =>
        robot.pos.x !== (size.x - 1) / 2 && robot.pos.y !== (size.y - 1) / 2
    )
    .reduce(
      (acc, { pos }) => {
        if (pos.x < size.x / 2) {
          if (pos.y < size.y / 2) {
            acc[0] += 1
          } else {
            acc[1] += 1
          }
        } else {
          if (pos.y < size.y / 2) {
            acc[2] += 1
          } else {
            acc[3] += 1
          }
        }
        return acc
      },
      [0, 0, 0, 0]
    )
    .reduce((a, b) => a * b)
}

console.log(getSafetyFactor(parseRobots(input), { x: 101, y: 103 }, 100))
