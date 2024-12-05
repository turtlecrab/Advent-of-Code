import {
  getCorrectedIncorrectUpdatesMiddleNumberSum,
  getCorrectUpdatesMiddleNumberSum,
  isCorrectUpdate,
  parseAll,
} from './day05'

const testInput = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`

describe('isCorrectUpdate', () => {
  it('works for first update', () => {
    const [rules, updates] = parseAll(testInput)
    expect(isCorrectUpdate(updates[0], rules)).toBe(true)
  })
})

describe('getCorrectUpdatesMiddleNumberSum', () => {
  it('works for test input', () => {
    expect(getCorrectUpdatesMiddleNumberSum(...parseAll(testInput))).toBe(143)
  })
})

describe('getCorrectedIncorrectUpdatesMiddleNumberSum', () => {
  it('works for test input', () => {
    expect(
      getCorrectedIncorrectUpdatesMiddleNumberSum(...parseAll(testInput))
    ).toBe(123)
  })
})
