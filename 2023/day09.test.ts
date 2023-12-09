import { getExtrapolatedSum, predict, predictBackwards } from './day09'

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`

describe('predict', () => {
  it('predicts for test input', () => {
    expect(predict('0 3 6 9 12 15')).toBe(18)
    expect(predict('1 3 6 10 15 21')).toBe(28)
    expect(predict('10 13 16 21 30 45')).toBe(68)
  })
})

describe('predictBackwards', () => {
  it('predicts for test input', () => {
    expect(predictBackwards('0 3 6 9 12 15')).toBe(-3)
    expect(predictBackwards('1 3 6 10 15 21')).toBe(0)
    expect(predictBackwards('10 13 16 21 30 45')).toBe(5)
  })
})

describe('getExtrapolatedSum', () => {
  it('gets it', () => {
    expect(getExtrapolatedSum(testInput)).toBe(114)
  })
  it('gets it backwards', () => {
    expect(getExtrapolatedSum(testInput, true)).toBe(2)
  })
})
