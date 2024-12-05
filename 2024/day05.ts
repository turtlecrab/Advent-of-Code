import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day05.input.txt', 'utf8')
  .replace(/\r/g, '')

type Rule = [number, number]
type Update = number[]

export function parseAll(input: string): [Rule[], Update[]] {
  const [rulesInput, updatesInput] = input.split('\n\n')

  return [
    rulesInput.split('\n').map(r => r.split('|').map(Number) as Rule),
    updatesInput.split('\n').map(u => u.split(',').map(Number)),
  ]
}

export function isCorrectUpdate(update: Update, rules: Rule[]): boolean {
  const updateMap = update.reduce((acc, cur, i) => {
    acc.set(cur, i)
    return acc
  }, new Map<number, number>())

  return rules.every(
    rule =>
      !(updateMap.has(rule[0]) && updateMap.has(rule[1])) ||
      updateMap.get(rule[0]) < updateMap.get(rule[1])
  )
}

export function getCorrectUpdatesMiddleNumberSum(
  rules: Rule[],
  updates: Update[]
): number {
  return updates
    .filter(update => isCorrectUpdate(update, rules))
    .map(update => update[Math.floor(update.length / 2)])
    .reduce((a, b) => a + b, 0)
}
console.log(getCorrectUpdatesMiddleNumberSum(...parseAll(input)))
