import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day07.input.txt', 'utf8')
  .replace(/\r/g, '')

const strength = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
}

type Card = keyof typeof strength

enum HandType {
  HiCard = 1,
  OnePair,
  TwoPairs,
  Set,
  Full,
  Four,
  Five,
}

type ParsedHand = {
  [key in Card]?: number
}

type Hand = {
  hand: string
  bid: number
  parsed: ParsedHand
}

export function parseHands(str: string): Hand[] {
  return str
    .split('\n')
    .map(line => line.split(' '))
    .map(([hand, bid]) => ({
      hand,
      bid: Number(bid),
      parsed: parseType(hand),
    }))
}

export function parseType(hand: string): ParsedHand {
  return hand.split('').reduce((acc, char) => {
    if (char in acc) {
      acc[char] += 1
    } else {
      acc[char] = 1
    }
    return acc
  }, {})
}

export function getType(hand: ParsedHand): HandType {
  const sorted = Object.values(hand).sort((a, b) => b - a)

  if (sorted[0] === 5) return HandType.Five
  if (sorted[0] === 4) return HandType.Four
  if (sorted[0] === 3 && sorted[1] === 2) return HandType.Full
  if (sorted[0] === 3) return HandType.Set
  if (sorted[0] === 2 && sorted[1] === 2) return HandType.TwoPairs
  if (sorted[0] === 2) return HandType.OnePair

  return HandType.HiCard
}

export function totalWinnings(hands: Hand[]): number {
  hands.sort((a, b) => {
    const byType = getType(a.parsed) - getType(b.parsed)

    if (byType !== 0) return byType

    for (let i = 0; i < a.hand.length; i++) {
      const byCard = strength[a.hand[i]] - strength[b.hand[i]]

      if (byCard !== 0) return byCard
    }
    return 0
  })
  return hands.map((hand, i) => hand.bid * (i + 1)).reduce((a, b) => a + b)
}

console.log(totalWinnings(parseHands(input)))
