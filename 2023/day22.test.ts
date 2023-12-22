import { fall, getBottomSurface, parseSortedBricks } from './day22'

const testInput = `
1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`.trim()

describe('parseSortedBricks', () => {
  it('parses', () => {
    expect(parseSortedBricks(testInput)[0][0]).toEqual({ x: 1, y: 1, z: 8 })
  })
})

describe('getBottomSurface', () => {
  it('gets positions from the bottom brick layer', () => {
    const bricks = parseSortedBricks(testInput)
    const brick = bricks.pop()
    expect(getBottomSurface(brick)).toHaveLength(3)
    const brick2 = bricks.shift()
    expect(getBottomSurface(brick2)).toHaveLength(1)
  })
})

describe('fall', () => {
  it('gets amount of safe bricks', () => {
    const bricks = parseSortedBricks(testInput)
    expect(fall(bricks)).toBe(5)
  })
})
