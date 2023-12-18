import {
  dig,
  expandGrid,
  getTrenchVolume,
  getTrenchVolume2,
  gridFromTrench,
  parseCommands,
  parseCommands2,
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
  it('gets volume for part 1', () => {
    expect(getTrenchVolume(dig(parseCommands(testInput)))).toBe(62)
  })
})

describe('parseCommands2', () => {
  it('parses for part 2', () => {
    const commands = parseCommands2(testInput)
    expect(commands[0]).toEqual({ dir: 'R', len: 461937 })
    expect(commands.at(-1)).toEqual({ dir: 'U', len: 500254 })
  })
})

describe('getTrenchVolume2', () => {
  it('gets volume for part 1', () => {
    expect(getTrenchVolume2(parseCommands(testInput))).toBe(62)
  })
  it('gets volume for part 2', () => {
    expect(getTrenchVolume2(parseCommands2(testInput))).toBe(952408144115)
  })
})
