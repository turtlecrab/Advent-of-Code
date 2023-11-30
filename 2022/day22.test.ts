import {
  Facing,
  getNextPosition,
  getPassword,
  getStartingPosition,
  parseInput,
  play,
  printMap,
} from './day22'

const testInput = `        ...#
        .#..
        #...
        ....
...#.......#
........#...
..#....#....
..........#.
        ...#....
        .....#..
        .#......
        ......#.

10R5L5R10L4R5L5`

describe('parseInput', () => {
  it('does stuff', () => {
    const { map, moves } = parseInput(testInput)
    // printMap(map)
    // console.log(moves)

    expect(moves).toHaveLength(7)
    expect(moves[0]).toEqual({ steps: 10, turn: 'R' })
    expect(moves.at(-1)).toEqual({ steps: 5, turn: '' })
    expect(map.every(row => row.length === 16)).toBeTruthy()
  })
})

describe('getStartingPosition', () => {
  it('does stuff', () => {
    const { map } = parseInput(testInput)
    const player = getStartingPosition(map)
    // printMap(map, player, 0)
    expect(player).toEqual({ x: 8, y: 0 })
  })
})

describe('getNextPosition', () => {
  const { map, moves } = parseInput(testInput)
  const player = getStartingPosition(map) // { x: 8, y: 0 }

  it('right: moves', () => {
    expect(getNextPosition(map, { x: 8, y: 0 }, Facing.Right)).toEqual({
      x: 9,
      y: 0,
    })
  })
  it('right: bumps into wall', () => {
    expect(getNextPosition(map, { x: 10, y: 0 }, Facing.Right)).toEqual({
      x: 10,
      y: 0,
    })
    expect(getNextPosition(map, { x: 8, y: 1 }, Facing.Right)).toEqual({
      x: 8,
      y: 1,
    })
  })
  it('right: goes around', () => {
    expect(getNextPosition(map, { x: 11, y: 1 }, Facing.Right)).toEqual({
      x: 8,
      y: 1,
    })
    expect(getNextPosition(map, { x: 11, y: 5 }, Facing.Right)).toEqual({
      x: 0,
      y: 5,
    })
    expect(getNextPosition(map, { x: 15, y: 11 }, Facing.Right)).toEqual({
      x: 8,
      y: 11,
    })
    expect(getNextPosition(map, { x: 15, y: 8 }, Facing.Right)).toEqual({
      x: 8,
      y: 8,
    })
  })
  it('right: bumps into around wall', () => {
    expect(getNextPosition(map, { x: 11, y: 2 }, Facing.Right)).toEqual({
      x: 11,
      y: 2,
    })
  })

  it('left: moves', () => {
    expect(getNextPosition(map, { x: 9, y: 0 }, Facing.Left)).toEqual({
      x: 8,
      y: 0,
    })
  })
  it('left: bumps into wall', () => {
    expect(getNextPosition(map, { x: 10, y: 1 }, Facing.Left)).toEqual({
      x: 10,
      y: 1,
    })
    expect(getNextPosition(map, { x: 9, y: 2 }, Facing.Left)).toEqual({
      x: 9,
      y: 2,
    })
  })
  it('left: goes around', () => {
    expect(getNextPosition(map, { x: 8, y: 1 }, Facing.Left)).toEqual({
      x: 11,
      y: 1,
    })
    expect(getNextPosition(map, { x: 0, y: 5 }, Facing.Left)).toEqual({
      x: 11,
      y: 5,
    })
    expect(getNextPosition(map, { x: 8, y: 11 }, Facing.Left)).toEqual({
      x: 15,
      y: 11,
    })
  })
  it('left: bumps into around wall', () => {
    expect(getNextPosition(map, { x: 0, y: 4 }, Facing.Left)).toEqual({
      x: 0,
      y: 4,
    })
  })

  it('down: moves', () => {
    expect(getNextPosition(map, { x: 8, y: 0 }, Facing.Down)).toEqual({
      x: 8,
      y: 1,
    })
  })
  it('down: bumps into wall', () => {
    expect(getNextPosition(map, { x: 9, y: 0 }, Facing.Down)).toEqual({
      x: 9,
      y: 0,
    })
    expect(getNextPosition(map, { x: 7, y: 5 }, Facing.Down)).toEqual({
      x: 7,
      y: 5,
    })
  })
  it('down: goes around', () => {
    expect(getNextPosition(map, { x: 8, y: 11 }, Facing.Down)).toEqual({
      x: 8,
      y: 0,
    })
    expect(getNextPosition(map, { x: 0, y: 8 }, Facing.Down)).toEqual({
      x: 0,
      y: 4,
    })
    expect(getNextPosition(map, { x: 12, y: 11 }, Facing.Down)).toEqual({
      x: 12,
      y: 8,
    })
  })
  it('down: bumps into around wall', () => {
    expect(getNextPosition(map, { x: 11, y: 11 }, Facing.Down)).toEqual({
      x: 11,
      y: 11,
    })
  })

  it('up: moves', () => {
    expect(getNextPosition(map, { x: 8, y: 0 }, Facing.Up)).toEqual({
      x: 8,
      y: 11,
    })
  })
  it('up: bumps into wall', () => {
    expect(getNextPosition(map, { x: 9, y: 2 }, Facing.Up)).toEqual({
      x: 9,
      y: 2,
    })
    expect(getNextPosition(map, { x: 2, y: 7 }, Facing.Up)).toEqual({
      x: 2,
      y: 7,
    })
  })
  it('up: goes around', () => {
    expect(getNextPosition(map, { x: 8, y: 0 }, Facing.Up)).toEqual({
      x: 8,
      y: 11,
    })
    expect(getNextPosition(map, { x: 0, y: 4 }, Facing.Up)).toEqual({
      x: 0,
      y: 7,
    })
    expect(getNextPosition(map, { x: 12, y: 8 }, Facing.Up)).toEqual({
      x: 12,
      y: 11,
    })
  })
  it('up: bumps into around wall', () => {
    expect(getNextPosition(map, { x: 14, y: 8 }, Facing.Up)).toEqual({
      x: 14,
      y: 8,
    })
  })
})

describe('getPassword', () => {
  it('does stuff', () => {
    const { map, moves } = parseInput(testInput)
    const player = getStartingPosition(map)
    const { position, facing } = play(map, player, moves)
    expect(getPassword(position.y, position.x, facing)).toBe(6032)
  })
})
