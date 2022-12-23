import {
  Direction,
  Elves,
  getBounds,
  getEmptiness,
  getNextElfPos,
  hasNeighbors,
  parseElves,
  round,
  simulate,
} from './day23'

const testInput = `.....
..##.
..#..
.....
..##.
.....`

const testInput2 = `....#..
..###.#
#...#.#
.#...##
#.###..
##.#.##
.#..#..`

export function printElves(elves: Elves): void {
  const { min, max } = getBounds(elves)
  for (let y = min.y - 1; y <= max.y + 1; y++) {
    let line = ''
    for (let x = min.x - 1; x <= max.x + 1; x++) {
      line += elves.has(`${x}:${y}`) ? '❎' : '⬛'
    }
    console.log(line)
  }
  console.log('')
}

describe('parseElves', () => {
  it('parses', () => {
    const elves = parseElves(testInput)
    // const elves2 = parseElves(testInput2)
    // printElves(elves)
    // printElves(elves2)
    expect(elves.has('2:1')).toBe(true)
  })
})

describe('hasNeighbors', () => {
  const elves = parseElves(`.....
..##.
..#..
.....
..#..
.....`)
  it('detects neighbors', () => {
    expect(hasNeighbors('2:1', elves)[Direction.Up]).toBe(false)
    expect(hasNeighbors('2:1', elves)[Direction.Right]).toBe(true)
    expect(hasNeighbors('2:1', elves)[Direction.Down]).toBe(true)
    expect(hasNeighbors('2:1', elves)[Direction.Left]).toBe(false)
  })
  it('detects alone elfs', () => {
    expect(hasNeighbors('2:1', elves).some(n => n)).toBe(true)
    expect(hasNeighbors('2:4', elves).some(n => n)).toBe(false)
  })
})

describe('getNextElfPos', () => {
  it('gets it', () => {
    expect(getNextElfPos('1:2', Direction.Down)).toBe('1:3')
    expect(getNextElfPos('1:2', Direction.Up)).toBe('1:1')
    expect(getNextElfPos('-3:2', Direction.Left)).toBe('-4:2')
    expect(getNextElfPos('-3:2', Direction.Right)).toBe('-2:2')
  })
})

describe('round', () => {
  it('works for test #1', () => {
    const elves = parseElves(testInput)
    // printElves(elves)
    const next = round(elves, Direction.Up)
    // printElves(next)
    const next2 = round(next, Direction.Down)
    // printElves(next2)
    const copy2 = new Set(next2) // in case function is not pure
    const next3 = round(next2, Direction.Left)
    // printElves(next3)
    const copy3 = new Set(next3) // in case function is not pure
    const next4 = round(next3, Direction.Right)
    // printElves(next4)
    expect(next3).not.toEqual(copy2)
    expect(next4).toEqual(copy3)
  })
  it('works for test #2', () => {
    const elves = parseElves(testInput2)
    // printElves(elves)

    let next = round(elves, Direction.Up)
    // printElves(next)
    next = round(next, Direction.Down)
    // printElves(next)
    next = round(next, Direction.Left)
    next = round(next, Direction.Right)
    next = round(next, Direction.Up)
    // printElves(next)
    expect(next.has('-2:3')).toBe(true)
  })
})

describe('simulate', () => {
  it('works for test #1', () => {
    const elves = parseElves(testInput)
    const afterTwo = simulate(new Set(elves), 2) // in case function is not pure
    const afterThree = simulate(new Set(elves), 3)
    const afterTen = simulate(new Set(elves))
    // printElves(afterTen)
    expect(afterTwo).not.toEqual(afterThree)
    expect(afterThree).toEqual(afterTen)
  })
})

describe('getEmptiness', () => {
  it('gets it', () => {
    expect(getEmptiness(parseElves(testInput2))).toBe(110)
  })
})
