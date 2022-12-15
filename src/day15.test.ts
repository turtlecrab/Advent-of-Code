import { getScannedPositionsOnLine, parseSensors } from './day15'

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
