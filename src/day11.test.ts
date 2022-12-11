import { computeInspections, getMonkeyBusiness, parseMonkeys } from './day11'

const testInput = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
  If true: throw to monkey 2
  If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
  If true: throw to monkey 2
  If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
  If true: throw to monkey 1
  If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
  If true: throw to monkey 0
  If false: throw to monkey 1`

describe('parseMonkeys', () => {
  it('parses', () => {
    expect(parseMonkeys(testInput)).toHaveLength(4)
    expect(parseMonkeys(testInput)[1].items).toEqual([54, 65, 75, 74])
    expect(parseMonkeys(testInput)[2].operation).toEqual({ type: 'square' })
  })
})

describe('computeInspections', () => {
  it('computes ', () => {
    expect(computeInspections(parseMonkeys(testInput))).toEqual([
      101, 95, 7, 105,
    ])
  })
})

describe('getMonkeyBusiness', () => {
  it('returns 🐵 business', () => {
    expect(getMonkeyBusiness(computeInspections(parseMonkeys(testInput)))).toBe(
      10605
    )
  })
})
