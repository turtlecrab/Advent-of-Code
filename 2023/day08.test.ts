import {
  getPrimeDividers,
  getLowestPrimeDivider,
  parseAll,
  play,
  playParallel,
} from './day08'

const testInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

const testInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

const testInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

describe('parseAll', () => {
  it('parses test inputs', () => {
    const [moves, nodes] = parseAll(testInput1)
    const [moves2, nodes2] = parseAll(testInput2)

    expect(moves).toBe('RL')
    expect(moves2).toBe('LLR')
    expect(nodes.AAA).toEqual({ left: 'BBB', right: 'CCC' })
    expect(nodes2).toEqual({
      AAA: { left: 'BBB', right: 'BBB' },
      BBB: { left: 'AAA', right: 'ZZZ' },
      ZZZ: { left: 'ZZZ', right: 'ZZZ' },
    })
  })
})

describe('play', () => {
  it('counts test input 1', () => {
    expect(play(...parseAll(testInput1))).toBe(2)
  })
  it('counts test input 2', () => {
    expect(play(...parseAll(testInput2))).toBe(6)
  })
})

describe('getLowestPrimeDivider', () => {
  it('gets it', () => {
    expect(getLowestPrimeDivider(1)).toBe(1)
    expect(getLowestPrimeDivider(2)).toBe(2)
    expect(getLowestPrimeDivider(3)).toBe(3)
    expect(getLowestPrimeDivider(4)).toBe(2)
    expect(getLowestPrimeDivider(5)).toBe(5)
    expect(getLowestPrimeDivider(6)).toBe(2)
    expect(getLowestPrimeDivider(7)).toBe(7)
    expect(getLowestPrimeDivider(8)).toBe(2)
    expect(getLowestPrimeDivider(9)).toBe(3)
    expect(getLowestPrimeDivider(997)).toBe(997)
  })
})

describe('getPrimeDividers', () => {
  it('gets em', () => {
    expect(getPrimeDividers(1)).toEqual([1])
    expect(getPrimeDividers(2)).toEqual([2])
    expect(getPrimeDividers(3)).toEqual([3])
    expect(getPrimeDividers(4)).toEqual([2, 2])
    expect(getPrimeDividers(12)).toEqual([2, 2, 3])
  })
})

describe('playParallel', () => {
  it('counts test input 3', () => {
    expect(playParallel(...parseAll(testInput3))).toBe(6)
  })
})
