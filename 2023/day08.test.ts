import { parseAll, play } from './day08'

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
