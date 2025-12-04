import { countAccessiblePapers, parseGrid } from './day04'

const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`

describe('Day04', () => {
  it('works for test input', () => {
    expect(countAccessiblePapers(parseGrid(testInput))).toBe(13)
  })
})
