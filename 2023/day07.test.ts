import { parseHands, totalWinnings } from './day07'

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`

describe('totalWinnings', () => {
  it('calculates winnings', () => {
    expect(totalWinnings(parseHands(testInput))).toBe(6440)
  })
})
