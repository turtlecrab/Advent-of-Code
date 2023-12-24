import { getIntersection2d, parse, get2dIntersectionCount } from './day24'

const testInput = `
19, 13, 30 @ -2,  1, -2
18, 19, 22 @ -1, -1, -2
20, 25, 34 @ -2, -2, -4
12, 31, 28 @ -1, -2, -1
20, 19, 15 @  1, -5, -3`.trim()

describe('parse', () => {
  it('parses', () => {
    expect(parse(testInput)[0]).toEqual({
      pos: { x: 19, y: 13, z: 30 },
      vel: { x: -2, y: 1, z: -2 },
    })
  })
})

describe('getIntersection2d', () => {
  const hails = parse(testInput)

  it('returns null on parallel rays', () => {
    expect(getIntersection2d(hails[1], hails[2])).toBeNull()
  })
  it('returns intersection #1', () => {
    const { pos, u, v } = getIntersection2d(hails[0], hails[1])
    expect(pos.x).toBeCloseTo(14.333)
    expect(pos.y).toBeCloseTo(15.333)
    expect(u).toBeGreaterThan(0)
    expect(v).toBeGreaterThan(0)
  })
  it('returns intersection #2', () => {
    const { pos, u, v } = getIntersection2d(hails[0], hails[2])
    expect(pos.x).toBeCloseTo(11.667)
    expect(pos.y).toBeCloseTo(16.667)
    expect(u).toBeGreaterThan(0)
    expect(v).toBeGreaterThan(0)
  })
  it('detects past intersection #1', () => {
    const { u, v } = getIntersection2d(hails[0], hails[4])
    expect(u).toBeLessThan(0)
    expect(v).toBeGreaterThan(0)
  })
  it('detects past intersection #2', () => {
    const { u, v } = getIntersection2d(hails[3], hails[4])
    expect(u).toBeLessThan(0)
    expect(v).toBeLessThan(0)
  })
})

describe('get2dIntersectionCount', () => {
  it('gets it', () => {
    expect(get2dIntersectionCount(parse(testInput), 7, 27)).toBe(2)
  })
})
