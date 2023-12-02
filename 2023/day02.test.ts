import {
  bag,
  getMinimumSet,
  getPossibleSum,
  getSumPowerOfMinimumSets,
  isGamePossible,
  isSetPossible,
  parseSet,
} from './day02'

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`

describe('isSetPossible', () => {
  it('checks set', () => {
    expect(isSetPossible('3 blue, 4 red', bag)).toBeTruthy()
    expect(isSetPossible('2 blue, 1 red, 2 green', bag)).toBeTruthy()
    expect(isSetPossible('8 green, 6 blue, 20 red', bag)).toBeFalsy()
    expect(isSetPossible('3 green, 15 blue, 14 red', bag)).toBeFalsy()
  })
})

describe('isGamePossible', () => {
  it('checks game', () => {
    expect(
      isGamePossible(
        'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
        bag
      )
    ).toBeTruthy()
    expect(
      isGamePossible(
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
        bag
      )
    ).toBeTruthy()
    expect(
      isGamePossible(
        'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
        bag
      )
    ).toBeFalsy()
    expect(
      isGamePossible(
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
        bag
      )
    ).toBeFalsy()
  })
})

describe('getPossibleSum', () => {
  it('calculates sum', () => {
    expect(getPossibleSum(testInput, bag)).toBe(8)
  })
})

describe('parseSet', () => {
  it('parses cube set', () => {
    expect(parseSet('3 blue, 4 red')).toEqual({ blue: 3, red: 4 })
    expect(parseSet('3 green, 15 blue, 14 red')).toEqual({
      blue: 15,
      red: 14,
      green: 3,
    })
  })
})

describe('getMinimumSet', () => {
  it('gets minimum cube set', () => {
    expect(
      getMinimumSet('Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green')
    ).toStrictEqual({
      red: 4,
      green: 2,
      blue: 6,
    })
    expect(
      getMinimumSet(
        'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue'
      )
    ).toEqual({
      red: 1,
      green: 3,
      blue: 4,
    })
    expect(
      getMinimumSet(
        'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red'
      )
    ).toEqual({
      red: 14,
      green: 3,
      blue: 15,
    })
  })
})

describe('getSumPowerOfMinimumSets', () => {
  it('gets it', () => {
    expect(getSumPowerOfMinimumSets(testInput)).toBe(2286)
  })
})
