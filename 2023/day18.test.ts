import {
  dig,
  expandGrid,
  getTrenchVolume,
  gridFromTrench,
  parseCommands,
} from './day18'

const testInput = `

R 6 (#70c710)
D 5 (#0dc571)
L 2 (#5713f0)
D 2 (#d2c081)
R 2 (#59c680)
D 2 (#411b91)
L 5 (#8ceee2)
U 2 (#caa173)
L 1 (#1b58a2)
U 2 (#caa171)
R 2 (#7807d2)
U 3 (#a77fa3)
L 2 (#015232)
U 2 (#7a21e3)`.trim()

const testResult = `#######
#.....#
###...#
..#...#
..#...#
###.###
#...#..
##..###
.#....#
.######`

function printGrid(grid: string[][]) {
  return grid.map(row => row.join('')).join('\n')
}

describe('parseCommands', () => {
  it('parses', () => {
    const cmd = parseCommands(testInput)
    expect(cmd[0]).toEqual({ dir: 'R', len: 6, color: '#70c710' })
    expect(cmd[13]).toEqual({ dir: 'U', len: 2, color: '#7a21e3' })
  })
})

describe('dig', () => {
  it('digs', () => {
    const trench = dig(parseCommands(testInput))
    expect(trench.size).toBe(38)
  })
})

describe('gridFromTrench', () => {
  it('gets grid map from trench', () => {
    const grid = gridFromTrench(dig(parseCommands(testInput)))
    expect(printGrid(grid)).toBe(testResult)
  })
})

describe('expandGrid', () => {
  it('expands grid in place', () => {
    const grid = gridFromTrench(dig(parseCommands(testInput)))
    // console.log(printGrid(grid))
    expandGrid(grid)
    // console.log('-----------')
    // console.log(printGrid(grid))
    expect(grid[1][1]).toBe('#')
  })
})

describe('getTrenchVolume', () => {
  it('does stuff', () => {
    expect(getTrenchVolume(dig(parseCommands(testInput)))).toBe(62)
  })
})
