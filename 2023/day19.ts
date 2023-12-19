import * as fs from 'fs'
import { cloneDeep } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day19.input.txt', 'utf8')
  .replace(/\r/g, '')

type Part = {
  x: number
  m: number
  a: number
  s: number
}

type RuleSet = Map<string, string>

export function parseAll(input: string) {
  const [rulesInput, partsInput] = input.split('\n\n')

  const parts: Part[] = partsInput.split('\n').map(line => {
    const [_, x, m, a, s] = line.match(/^{x=(\d+),m=(\d+),a=(\d+),s=(\d+)}$/)
    return {
      x: Number(x),
      m: Number(m),
      a: Number(a),
      s: Number(s),
    }
  })
  const workflows = new Map<string, RuleSet>()

  for (let line of rulesInput.split('\n')) {
    const [_, name, ruleList] = line.match(/^(\S+){(\S+)}$/)

    const ruleSet = ruleList.split(',').reduce((acc, rule) => {
      if (!rule.includes(':')) {
        acc.set('goto', rule)
      } else {
        const [cond, goto] = rule.split(':')
        acc.set(cond, goto)
      }
      return acc
    }, new Map<string, string>())

    workflows.set(name, ruleSet)
  }
  return { parts, workflows }
}

export function process(part: Part, workflow: RuleSet): string {
  for (let [cond, dest] of workflow) {
    if (cond === 'goto') return dest

    const [cat, num] = cond.split(/[<>]/)

    if (cond.includes('<')) {
      if (part[cat] < Number(num)) return dest
    } else if (cond.includes('>')) {
      if (part[cat] > Number(num)) return dest
    } else {
      throw new Error("shouldn't go here")
    }
  }
  throw new Error("shouldn't go here")
}

export function isAccepting(
  part: Part,
  workflows: Map<string, RuleSet>
): boolean {
  let node = 'in'
  while (node !== 'A' && node !== 'R') {
    node = process(part, workflows.get(node))
  }
  return node === 'A'
}

export function filterParts(input: string): Part[] {
  const { parts, workflows } = parseAll(input)

  return parts.filter(part => isAccepting(part, workflows))
}

export function getSum(parts: Part[]): number {
  return parts.map(({ x, m, a, s }) => x + m + a + s).reduce((a, b) => a + b)
}

export type Range = {
  x: [number, number]
  m: [number, number]
  a: [number, number]
  s: [number, number]
  next: string
}

export function processRange(
  range: Range,
  workflows: Map<string, RuleSet>
): Range[] {
  const rules = workflows.get(range.next)
  const nextRanges: Range[] = []

  for (let [cond, dest] of rules) {
    if (cond === 'goto') {
      range.next = dest
      nextRanges.push(range)
      break
    }
    const [cat, n] = cond.split(/[<>]/)
    const num = Number(n)

    if (cond.includes('<')) {
      if (range[cat][1] <= num) {
        // all range goes to dest
        range.next = dest
        nextRanges.push(range)
        break
      } else if (range[cat][0] < num) {
        // split goes to dest, remainder remains
        const split = cloneDeep(range)
        split[cat][1] = num
        split.next = dest
        nextRanges.push(split)

        range[cat][0] = num
      }
    } else if (cond.includes('>')) {
      if (range[cat][0] > num) {
        range.next = dest
        nextRanges.push(range)
        break
      } else if (range[cat][1] > num + 1) {
        const split = cloneDeep(range)
        split[cat][0] = num + 1
        split.next = dest
        nextRanges.push(split)

        range[cat][1] = num + 1
      }
    } else {
      throw new Error("shouldn't go here")
    }
  }
  return nextRanges
}

export function getAcceptedRanges(input: string): Range[] {
  const { workflows } = parseAll(input)

  const ranges: Range[] = [
    {
      x: [1, 4001],
      m: [1, 4001],
      a: [1, 4001],
      s: [1, 4001],
      next: 'in',
    },
  ]
  const accepted: Range[] = []

  while (ranges.length) {
    const range = ranges.pop()

    const next = processRange(range, workflows).filter(r => {
      if (r.next === 'R') return false
      if (r.next === 'A') {
        accepted.push(r)
        return false
      }
      return true
    })
    ranges.push(...next)
  }
  return accepted
}

export function getCombinations(ranges: Range[]): number {
  return ranges
    .map(
      ({ x, m, a, s }) =>
        (x[1] - x[0]) * (m[1] - m[0]) * (a[1] - a[0]) * (s[1] - s[0])
    )
    .reduce((a, b) => a + b)
}

console.log(getSum(filterParts(input)))

console.log(getCombinations(getAcceptedRanges(input)))
