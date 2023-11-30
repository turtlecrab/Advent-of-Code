import {
  findAdjacentSensors,
  findLineBetween,
  getLineIntersection,
  getScannedPositionsOnLine,
  parseSensors,
} from './day15'

const testInput = `Sensor at x=2, y=18: closest beacon is at x=-2, y=15
Sensor at x=9, y=16: closest beacon is at x=10, y=16
Sensor at x=13, y=2: closest beacon is at x=15, y=3
Sensor at x=12, y=14: closest beacon is at x=10, y=16
Sensor at x=10, y=20: closest beacon is at x=10, y=16
Sensor at x=14, y=17: closest beacon is at x=10, y=16
Sensor at x=8, y=7: closest beacon is at x=2, y=10
Sensor at x=2, y=0: closest beacon is at x=2, y=10
Sensor at x=0, y=11: closest beacon is at x=2, y=10
Sensor at x=20, y=14: closest beacon is at x=25, y=17
Sensor at x=17, y=20: closest beacon is at x=21, y=22
Sensor at x=16, y=7: closest beacon is at x=15, y=3
Sensor at x=14, y=3: closest beacon is at x=15, y=3
Sensor at x=20, y=1: closest beacon is at x=15, y=3`

describe('parseSensors', () => {
  it('parses sensors', () => {
    expect(parseSensors(testInput)).toHaveLength(14)
    expect(parseSensors(testInput)[0]).toEqual({
      pos: { x: 2, y: 18 },
      closest: { x: -2, y: 15 },
    })
  })
})

describe('getScannedPositionsOnLine', () => {
  it('returns correct positions', () => {
    expect(getScannedPositionsOnLine(10, parseSensors(testInput)).size).toBe(26)
    expect(getScannedPositionsOnLine(9, parseSensors(testInput)).size).toBe(25)
    expect(getScannedPositionsOnLine(11, parseSensors(testInput)).size).toBe(27)
  })
})

describe('findAdjacentSensors', () => {
  it('finds all pairs', () => {
    const adjacent = findAdjacentSensors(parseSensors(testInput))
    // console.log(adjacent.map(p => [p[0].pos, p[1].pos]))
    expect(adjacent).toHaveLength(7)
  })
})

describe('findLineBetween', () => {
  const adjacent = findAdjacentSensors(parseSensors(testInput))
  const pair = adjacent[0]
  const line = findLineBetween(...pair)

  it('gets the line direction', () => {
    expect(line.direction).toBe('downright')
  })
  it('gets the line position', () => {
    expect(line.pos.x - line.pos.y).toBe(3)
  })
})

describe('get that damn point', () => {
  it('gets it', () => {
    const adjacent = findAdjacentSensors(parseSensors(testInput))
    const lines = adjacent.map(pair => findLineBetween(...pair))

    // This works for test case just out of luck.
    // And it works for the real input because there are
    // only 2 adjacent pairs of sensors.
    // We should check all combinations of crossing lines
    // and then check every point for being inside another sensor.
    expect(getLineIntersection(lines[0], lines[1])).toEqual({ x: 14, y: 11 })
  })
})
