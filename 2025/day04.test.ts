import { countAccessiblePapers, parseGrid, removeAll } from './day04'

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

describe('part 1', () => {
  it('works for test input', () => {
    expect(countAccessiblePapers(parseGrid(testInput))).toBe(13)
  })
})

describe('part 2', () => {
  it('works for test input', () => {
    expect(removeAll(parseGrid(testInput))).toBe(43)
  })
})
