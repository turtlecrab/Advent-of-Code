import {
  getSafeReportsCount,
  getTolerateSafeReportsCount,
  parseReports,
} from './day02'

const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`

describe('getSafeReportsCount', () => {
  it('works for test input', () => {
    expect(getSafeReportsCount(parseReports(testInput))).toBe(2)
  })
})

describe('isTolerateSafe', () => {
  it('works for test input', () => {
    expect(getTolerateSafeReportsCount(parseReports(testInput))).toBe(4)
  })
})
