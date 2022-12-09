import {
  parseMoves,
  getTailVisitedPositions,
  getNextHead,
  getNextTail,
} from './day09'

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

describe('getNextHead', () => {
  it('moves the head', () => {
    expect(getNextHead({ x: 0, y: 0 }, 'R')).toEqual({ x: 1, y: 0 })
    expect(getNextHead({ x: 7, y: -9 }, 'U')).toEqual({ x: 7, y: -8 })
  })
})

describe('getNextTail', () => {
  it('moves a tail', () => {
    expect(getNextTail({ x: 1, y: 1 }, { x: 0, y: 0 })).toEqual({ x: 0, y: 0 })
  })
  it('moves a tail diagonally', () => {
    expect(getNextTail({ x: 2, y: 2 }, { x: 0, y: 0 })).toEqual({ x: 1, y: 1 })
  })
})

describe('getTailVisitedPositions l=2', () => {
  it('works for length of 2', () => {
    expect(getTailVisitedPositions(parseMoves(testInput), 2).size).toBe(13)
  })
})

describe('getTailVisitedPositions l=10', () => {
  const testInput2 = `R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`
  it('works for length of 10', () => {
    expect(getTailVisitedPositions(parseMoves(testInput2), 10).size).toBe(36)
  })
})
