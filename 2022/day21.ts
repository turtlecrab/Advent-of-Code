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

export function getParent(monkeys: Monkeys, monkey: string): string {
  return Object.entries(monkeys).find(entry => entry[1].includes(monkey))[0]
}

export function getAncestry(monkeys: Monkeys, monkey: string): string[] {
  const result = []
  while (monkey !== 'root') {
    result.unshift(monkey)
    const parent = getParent(monkeys, monkey)
    monkey = parent
  }
  return result
}

export function getHumnValue(monkeys: Monkeys): number {
  const ancestry = getAncestry(monkeys, 'humn')

  const getOther = (branch: string, name: string) =>
    monkeys[branch].split(' ').find(s => /[a-z]/.test(s) && s !== name)

  const humnBranch = ancestry[0]
  const otherBranch = getOther('root', humnBranch)

  let currentNum = getYell(monkeys, otherBranch)

  for (let i = 0; i < ancestry.length - 1; i++) {
    const cur = ancestry[i]
    const next = ancestry[i + 1]
    const other = getOther(cur, next)

    const otherNum = getYell(monkeys, other)

    const [left, oper, _right] = monkeys[cur].split(' ')

    if (left === next) {
      // next ? otherNum = currentNum
      if (oper === '+') {
        currentNum = currentNum - otherNum
      } else if (oper === '-') {
        currentNum = currentNum + otherNum
      } else if (oper === '*') {
        currentNum = currentNum / otherNum
      } else if (oper === '/') {
        currentNum = currentNum * otherNum
      }
    } else {
      // otherNum ? next = currentNum
      if (oper === '+') {
        currentNum = currentNum - otherNum
      } else if (oper === '-') {
        currentNum = otherNum - currentNum
      } else if (oper === '*') {
        currentNum = currentNum / otherNum
      } else if (oper === '/') {
        currentNum = otherNum / currentNum
      }
    }
  }
  return currentNum
}

console.log(getYell(parseMonkeys(input)))

console.log(getHumnValue(parseMonkeys(input)))
