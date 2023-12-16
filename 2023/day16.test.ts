import { Layout, getEnergizedTilesCount, parseMap, simulate } from './day16'

const testInput = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`

const testEnergyMap = `######....
.#...#....
.#...#####
.#...##...
.#...##...
.#...##...
.#..####..
########..
.#######..
.#...#.#..`

describe('parseMap', () => {
  it('parses', () => {
    const map = parseMap(testInput)
    expect(map[0][5].tile).toBe('\\')
  })
})

describe('simulate', () => {
  it('simulates', () => {
    const map = simulate(parseMap(testInput))
    const energyMap = map
      .map(row =>
        row.map(cell => (cell.beamDirs.size > 0 ? '#' : '.')).join('')
      )
      .join('\n')
    expect(energyMap).toBe(testEnergyMap)
  })
})

describe('getEnergizedTilesCount', () => {
  it('gets it', () => {
    expect(getEnergizedTilesCount(simulate(parseMap(testInput)))).toBe(46)
  })
})
