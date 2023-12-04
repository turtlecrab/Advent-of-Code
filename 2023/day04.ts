import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day04.input.txt', 'utf8')
  .replace(/\r/g, '')

type Card = {
  winning: number[]
  hand: number[]
}

export function parseCard(str: string): Card {
  const data = str.split(':')[1].trim()
  const [winning, hand] = data
    .split('|')
    .map(s => s.trim().split(/\s+/).map(Number))

  return {
    winning,
    hand,
  }
}

export function getMatches(card: Card): number {
  return card.hand.filter(n => card.winning.includes(n)).length
}

export function getWorth(card: Card): number {
  const matches = getMatches(card)

  if (matches === 0) return 0

  return 2 ** (matches - 1)
}

export function getTotalWorth(input: string): number {
  return input
    .split('\n')
    .map(parseCard)
    .map(getWorth)
    .reduce((a, c) => a + c)
}

export function getTotalCards(input: string): number {
  const lines = input.split('\n')
  const cards = Array(lines.length).fill(1)

  for (let i = 0; i < lines.length; i++) {
    const matches = getMatches(parseCard(lines[i]))

    for (let j = i + 1; j <= i + matches; j++) {
      cards[j] += cards[i]
    }
  }

  return cards.reduce((a, c) => a + c)
}

console.log(getTotalWorth(input))

console.log(getTotalCards(input))
