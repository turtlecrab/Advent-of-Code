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

export function getWorth(card: Card): number {
  const matches = card.hand.filter(n => card.winning.includes(n)).length

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

console.log(getTotalWorth(input))
