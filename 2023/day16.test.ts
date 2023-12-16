import {
  Dir,
  getEnergizedTilesCount,
  getMaxTilesCount,
  parseMap,
  simulate,
} from './day16'

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

const testEnergyMap2 = `.#####....
.#.#.#....
.#.#.#####
.#.#.##...
.#.#.##...
.#.#.##...
.#.#####..
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
  it('works with different starting position', () => {
    const map = simulate(parseMap(testInput), {
      pos: { y: 0, x: 3 },
      dir: Dir.Down,
    })
    const energyMap = map
      .map(row =>
        row.map(cell => (cell.beamDirs.size > 0 ? '#' : '.')).join('')
      )
      .join('\n')
    expect(energyMap).toBe(testEnergyMap2)
  })
})

describe('getEnergizedTilesCount', () => {
  it('gets it', () => {
    expect(getEnergizedTilesCount(simulate(parseMap(testInput)))).toBe(46)
  })
})

describe('getMaxTilesCount', () => {
  it('gets it', () => {
    expect(getMaxTilesCount(parseMap(testInput))).toBe(51)
  })
})
