import { getPassword, parseDials } from './day01'

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

describe('Day01', () => {
  it('works for test input', () => {
    expect(getPassword(parseDials(testInput))).toBe(3)
  })
})
