import { blink, getStonesCount, parseStones } from './day11'

const testInput = `125 17`

describe('blink', () => {
  it('works for test input', () => {
    expect(blink(parseStones(testInput), 6).join(' ')).toEqual(
      '2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2'
    )
  })
})

describe('getStonesCount', () => {
  it('works for test input', () => {
    expect(getStonesCount(parseStones(testInput), 25)).toBe(55312)
  })
})
