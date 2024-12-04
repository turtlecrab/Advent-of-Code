import { getWordCountInLine, getXmasCount, parseGrid } from './day04'

const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`

describe('getWordCountInLine', () => {
  it('works', () => {
    expect(getWordCountInLine('XMAS', 'XMASAMX.MM')).toBe(2)
  })
})

describe('getXmasCount', () => {
  it('works for test input', () => {
    expect(getXmasCount(parseGrid(testInput))).toBe(18)
  })
})
