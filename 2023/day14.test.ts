import {
  getTotalLoad,
  step,
  parseMap,
  simulate,
  cycle,
  turn,
  getTotalLoadAfterCycles,
} from './day14'

const testInput = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`

const testInput2 = `OOOO.#.O..
OO..#....#
OO..O##..O
O..#.OO...
........#.
..#....#.#
..O..#.O.O
..O.......
#....###..
#....#....`

describe('step', () => {
  it('moves 1 step in place', () => {
    const map = parseMap('O....#....\nO.OO#....#')
    const map2 = parseMap('O.OO.#....\nO...#....#')

    step(map, 1)
    expect(map).toEqual(map2)
  })
})

describe('simulate', () => {
  it('moves all rows in place', () => {
    const map = parseMap(testInput)
    const map2 = parseMap(testInput2)

    simulate(map)
    expect(map).toEqual(map2)
  })
})

describe('getTotalLoad', () => {
  it('gets it', () => {
    expect(getTotalLoad(simulate(parseMap(testInput)))).toBe(136)
  })
})

describe('turn', () => {
  it('turns matrix clockwise', () => {
    expect(turn(parseMap('O#\n..'))).toEqual(parseMap('.O\n.#'))
    expect(turn(parseMap('O#\n..\n..'))).toEqual(parseMap('..O\n..#'))
  })
})

describe('cycle', () => {
  let map = parseMap(testInput)

  it('works after 1 cycle', () => {
    map = cycle(map)
    expect(map).toEqual(
      parseMap(
        `.....#....\n....#...O#\n...OO##...\n.OO#......\n.....OOO#.\n.O#...O#.#\n....O#....\n......OOOO\n#...O###..\n#..OO#....`
      )
    )
  })
  it('works after 2 cycles', () => {
    map = cycle(map)
    expect(map).toEqual(
      parseMap(
        `.....#....\n....#...O#\n.....##...\n..O#......\n.....OOO#.\n.O#...O#.#\n....O#...O\n.......OOO\n#..OO###..\n#.OOO#...O`
      )
    )
  })
  it('works after 3 cycles', () => {
    map = cycle(map)
    expect(map).toEqual(
      parseMap(
        `.....#....\n....#...O#\n.....##...\n..O#......\n.....OOO#.\n.O#...O#.#\n....O#...O\n.......OOO\n#...O###.O\n#.OOO#...O`
      )
    )
  })
})

describe('getTotalLoadAfterCycles', () => {
  it('gets it', () => {
    expect(getTotalLoadAfterCycles(parseMap(testInput))).toBe(64)
  })
})
