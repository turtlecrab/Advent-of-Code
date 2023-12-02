import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day02.input.txt', 'utf8')
  .replace(/\r/g, '')

export type Bag = {
  red: number
  green: number
  blue: number
}

export type CubeSet = {
  red?: number
  green?: number
  blue?: number
}

export const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
}

export function isSetPossible(set: string, bag: Bag) {
  for (let colorSet of set.split(', ')) {
    const [amount, color] = colorSet.split(' ')
    if (Number(amount) > bag[color]) {
      return false
    }
  }
  return true
}

export function isGamePossible(game: string, bag: Bag) {
  const [_, sets] = game.split(': ')

  for (let set of sets.split('; ')) {
    if (!isSetPossible(set, bag)) {
      return false
    }
  }
  return true
}

export function getPossibleSum(games: string, bag: Bag) {
  return games.split('\n').reduce((sum, game) => {
    return isGamePossible(game, bag)
      ? sum + Number(game.match(/^Game (\d+)/)[1])
      : sum
  }, 0)
}

export function parseSet(set: string): CubeSet {
  return set.split(', ').reduce((acc, cur) => {
    const [amount, color] = cur.split(' ')
    acc[color] = Number(amount)
    return acc
  }, {})
}

export function getMinimumSet(game: string): CubeSet {
  const sets = game.split(': ')[1].split('; ').map(parseSet)

  return sets.reduce((acc, cur) => {
    for (let color of Object.keys(cur)) {
      acc[color] = acc[color] ? Math.max(acc[color], cur[color]) : cur[color]
    }
    return acc
  })
}

export function getSumPowerOfMinimumSets(games: string): number {
  return games.split('\n').reduce((sum, game) => {
    const power = Object.values(getMinimumSet(game)).reduce((a, c) => a * c)
    return sum + power
  }, 0)
}

console.log(getPossibleSum(input, bag))
console.log(getSumPowerOfMinimumSets(input))
