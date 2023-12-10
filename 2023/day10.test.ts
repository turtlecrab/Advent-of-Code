import {
  getCleanMap,
  findLoop,
  getLongestLength,
  parseMap,
  getFloodFilledPixelMap,
  getEnclosedTilesCount,
} from './day10'

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

const testInput4 = `

.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...

`.trim()

const testInput5 = `

FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L

`.trim()

function asciiArt(char: string): string {
  const map = {
    '7': '┐',
    L: '└',
    '-': '─',
    J: '┘',
    F: '┌',
    '|': '│',
  }
  if (char in map) return map[char]
  return char
}

function printMap(map: string[][]) {
  console.log(map.map(row => row.map(asciiArt).join('')).join('\n'), '\n')
}

function pixelArt(num: number): number {
  const map = {
    0: '░',
    1: '█',
    2: '~',
  }
  if (num in map) return map[num]
  return num
}

function printPixels(map: number[][]) {
  console.log(map.map(row => row.map(pixelArt).join('')).join('\n'), '\n')
}

describe('findLoop', () => {
  it('returns intersection', () => {
    const loop = findLoop(parseMap(testInput1))
    const loop2 = findLoop(parseMap(testInput2))
    const loop3 = findLoop(parseMap(testInput3))

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

describe('getCleanMap', () => {
  it('parses test input 1', () => {
    const map1 = getCleanMap(testInput1)
    expect(map1[1][1]).toBe('F')
  })
  it('parses inputs 2 & 3', () => {
    const map2 = getCleanMap(testInput2)
    const map3 = getCleanMap(testInput3)
    expect(map2).toEqual(map3)
  })
})

// describe('print getFloodFilledPixelMap', () => {
//   it('prints', () => {
//     printMap(parseMap(testInput5))
//     printMap(getCleanMap(testInput5))
//     printPixels(getFloodFilledPixelMap(testInput5))
//   })
// })

describe('getEnclosedTiles', () => {
  it('gets', () => {
    expect(getEnclosedTilesCount(testInput1)).toBe(1)
    expect(getEnclosedTilesCount(testInput2)).toBe(1)
    expect(getEnclosedTilesCount(testInput3)).toBe(1)
    expect(getEnclosedTilesCount(testInput4)).toBe(8)
    expect(getEnclosedTilesCount(testInput5)).toBe(10)
  })
})
