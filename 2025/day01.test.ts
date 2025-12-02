import {
  getPassword,
  getPassword2,
  getZeroCrossings,
  parseDials,
} from './day01'

const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`

describe('getZeroCrossings', () => {
  it('works', () => {
    expect(getZeroCrossings(50, 50 - 68)).toBe(1)
    expect(getZeroCrossings(30, 52)).toBe(0)
  })
})

describe('Day01', () => {
  it('works for test input', () => {
    expect(getPassword(parseDials(testInput))).toBe(3)
  })
  it('works for test input p2', () => {
    expect(getPassword2(parseDials(testInput))).toBe(6)
  })
})
