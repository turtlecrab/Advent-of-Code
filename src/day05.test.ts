import {
  getStateSize,
  getTopCratesString,
  makeMoveByOne,
  makeMoveWhole,
  Move,
  parseMove,
  parseState,
} from './day05'

const testRawState = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 `

const testRawMoves = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`

describe('parseState', () => {
  it('gets the number of columns', () => {
    expect(getStateSize(testRawState)).toBe(3)
  })
  it('parses state', () => {
    expect(parseState(testRawState)).toEqual([
      ['Z', 'N'],
      ['M', 'C', 'D'],
      ['P'],
    ])
  })
})

describe('parseMove', () => {
  it('throws on bad input', () => {
    expect(() => parseMove('mve 3 from 2 to 5')).toThrow()
  })
  it('parses a valid string', () => {
    expect(parseMove('move 3 from 2 to 5')).toEqual<Move>({
      amount: 3,
      from: 2,
      to: 5,
    })
  })
  it('parses bigger numbers', () => {
    expect(parseMove('move 140 from 9000 to 99999')).toEqual<Move>({
      amount: 140,
      from: 9000,
      to: 99999,
    })
  })
  it('parses leading zeroes', () => {
    expect(parseMove('move 001 from 300 to 040')).toEqual<Move>({
      amount: 1,
      from: 300,
      to: 40,
    })
  })
})

describe('Moving crates', () => {
  const moves = testRawMoves.split('\n').map(parseMove)

  it('moves by one', () => {
    const state = parseState(testRawState)
    moves.forEach(move => makeMoveByOne(state, move))
    expect(state).toEqual([['C'], ['M'], ['P', 'D', 'N', 'Z']])
  })
  it('moves several at once', () => {
    const state = parseState(testRawState)
    moves.forEach(move => makeMoveWhole(state, move))
    expect(state).toEqual([['M'], ['C'], ['P', 'Z', 'N', 'D']])
  })
})

describe('getTopCratesString', () => {
  it('returns top crates as string', () => {
    expect(getTopCratesString([['C'], ['M'], ['P', 'D', 'N', 'Z']])).toBe('CMZ')
  })
})
