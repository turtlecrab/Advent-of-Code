import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day21.input.txt', 'utf8')
  .replace(/\r/g, '')

type Monkeys = {
  [key: string]: string
}

export function parseMonkeys(str: string): Monkeys {
  return str.split('\n').reduce((acc, cur) => {
    const [name, operation] = cur.split(': ')
    acc[name] = operation
    return acc
  }, {})
}

export function getYell(monkeys: Monkeys, who = 'root'): number {
  const yell = monkeys[who]

  if (/^\d+$/.test(yell)) return Number(yell)

  const [left, oper, right] = yell.split(' ')

  if (oper === '+') return getYell(monkeys, left) + getYell(monkeys, right)
  if (oper === '-') return getYell(monkeys, left) - getYell(monkeys, right)
  if (oper === '*') return getYell(monkeys, left) * getYell(monkeys, right)
  if (oper === '/') return getYell(monkeys, left) / getYell(monkeys, right)

  throw new Error('invalid yell: ' + yell)
}

console.log(getYell(parseMonkeys(input)))
