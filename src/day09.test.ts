import { parseMoves, getNewPositions, getTailVisitedPositions } from './day09'

const testInput = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`

describe('parseMoves', () => {
  it('parses moves', () => {
    expect(parseMoves(testInput)).toHaveLength(8)
    expect(parseMoves(testInput)[4]).toEqual({
      direction: 'R',
      amount: 4,
    })
  })
})

describe('getNewPositions', () => {
  it('moves by 1', () => {
    expect(
      getNewPositions(
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { direction: 'R', amount: 1 }
      )
    ).toEqual({
      head: {
        x: 1,
        y: 0,
      },
      tail: {
        x: 0,
        y: 0,
      },
    })
  })
  it('moves horizontally', () => {
    expect(
      getNewPositions(
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { direction: 'R', amount: 4 }
      )
    ).toEqual({
      head: {
        x: 4,
        y: 0,
      },
      tail: {
        x: 3,
        y: 0,
      },
    })
  })
  it('moves vertically', () => {
    expect(
      getNewPositions(
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { direction: 'D', amount: 4 }
      )
    ).toEqual({
      head: {
        x: 0,
        y: -4,
      },
      tail: {
        x: 0,
        y: -3,
      },
    })
  })
})

describe('getTailVisitedPositions', () => {
  it('gets positions visited by tail', () => {
    expect(getTailVisitedPositions(parseMoves(testInput))).toBe(13)
  })
})
