import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day15.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

type Sensor = {
  pos: Vec
  closest: Vec
}

export function parseSensors(str: string): Sensor[] {
  return str.split('\n').map(line => {
    const [, sx, sy, bx, by] = line.match(
      /Sensor at x=(-?\d+), y=(-?\d+): closest beacon is at x=(-?\d+), y=(-?\d+)/
    )
    return {
      pos: { x: Number(sx), y: Number(sy) },
      closest: { x: Number(bx), y: Number(by) },
    }
  })
}

export function getDistance(a: Vec, b: Vec): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export function getIntersection(
  sensor: Sensor,
  lineNum: number
): Set<number> | null {
  const yDist = Math.abs(lineNum - sensor.pos.y)
  const sensorRadius = getDistance(sensor.pos, sensor.closest)

  if (yDist > sensorRadius) {
    // no intersection
    return null
  }
  const span = sensorRadius - yDist
  // inclusive
  const from = sensor.pos.x - span
  const to = sensor.pos.x + span

  const result = new Set<number>()
  for (let i = from; i <= to; i++) {
    result.add(i)
  }
  return result
}

export function getScannedPositionsOnLine(
  lineNum: number,
  sensors: Sensor[]
): Set<number> {
  const result = new Set<number>()

  // add intersections
  for (let sensor of sensors) {
    const intersection = getIntersection(sensor, lineNum)
    if (intersection) {
      intersection.forEach(inter => result.add(inter))
    }
  }
  // remove sensors & beacons
  for (let sensor of sensors) {
    if (sensor.pos.y === lineNum) {
      result.delete(sensor.pos.x)
    }
    if (sensor.closest.y === lineNum) {
      result.delete(sensor.closest.x)
    }
  }
  return result
}

console.log(getScannedPositionsOnLine(2000000, parseSensors(input)).size)
