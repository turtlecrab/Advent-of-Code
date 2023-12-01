import { getCalibrationValue, getParsedCalibrationValue } from './day01'

describe('getCalibrationValue', () => {
  it('gets it', () => {
    expect(getCalibrationValue('1abc2')).toBe(12)
    expect(getCalibrationValue('pqr3stu8vwx')).toBe(38)
    expect(getCalibrationValue('a1b2c3d4e5f')).toBe(15)
    expect(getCalibrationValue('treb7uchet')).toBe(77)
  })
})

describe('getParsedCalibrationValue', () => {
  it('parses spelled digits', () => {
    expect(getParsedCalibrationValue('two1nine')).toBe(29)
    expect(getParsedCalibrationValue('eightwothree')).toBe(83)
    expect(getParsedCalibrationValue('abcone2threexyz')).toBe(13)
    expect(getParsedCalibrationValue('xtwone3four')).toBe(24)
    expect(getParsedCalibrationValue('4nineeightseven2')).toBe(42)
    expect(getParsedCalibrationValue('zoneight234')).toBe(14)
    expect(getParsedCalibrationValue('7pqrstsixteen')).toBe(76)
    expect(getParsedCalibrationValue('eighthree')).toBe(83)
  })
})
