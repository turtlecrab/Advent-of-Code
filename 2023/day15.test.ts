import { calculateFocusingPower, getHashSum, hash, process } from './day15'

const testInput = 'rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7'

describe('hash', () => {
  it('hashes the test input', () => {
    expect(hash('HASH')).toBe(52)
    expect(hash('rn=1')).toBe(30)
    expect(hash('cm-')).toBe(253)
    expect(hash('qp=3')).toBe(97)
  })
})

describe('getHashSum', () => {
  it('gets it', () => {
    expect(getHashSum(testInput)).toBe(1320)
  })
})

describe('process', () => {
  it('processes', () => {
    const boxes = process(testInput)
    expect(boxes[0]).toEqual(
      new Map([
        ['rn', 1],
        ['cm', 2],
      ])
    )
    expect(boxes[3]).toEqual(
      new Map([
        ['ot', 7],
        ['ab', 5],
        ['pc', 6],
      ])
    )
  })
})

describe('calculateFocusingPower', () => {
  it('calulates part 2 answer', () => {
    expect(calculateFocusingPower(process(testInput))).toBe(145)
  })
})
