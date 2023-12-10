import { findLoop, getLongestLength, parse } from './day10'

const testInput1 = `.....
.S-7.
.|.|.
.L-J.
.....`

const testInput2 = `

..F7.
.FJ|.
SJ.L7
|F--J
LJ...

`.trim()

const testInput3 = `

7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ

`.trim()

describe('findLoop', () => {
  it('returns intersection', () => {
    const loop = findLoop(parse(testInput1))
    const loop2 = findLoop(parse(testInput2))
    const loop3 = findLoop(parse(testInput3))

    expect(loop[0].length).toBe(4)
    expect(loop[0].pos).toEqual({ x: 3, y: 3 })
    expect(loop2[0].length).toBe(8)
    expect(loop2[0].pos).toEqual({ x: 4, y: 2 })
    expect(loop3[0].length).toBe(8)
    expect(loop3[0].pos).toEqual({ x: 4, y: 2 })
  })
})

describe('getLongestLength', () => {
  it('gets it', () => {
    expect(getLongestLength(testInput1)).toBe(4)
    expect(getLongestLength(testInput2)).toBe(8)
    expect(getLongestLength(testInput3)).toBe(8)
  })
})
