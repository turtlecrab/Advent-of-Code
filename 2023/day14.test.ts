import { getTotalLoad, step, parseMap, simulate } from './day14'

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
