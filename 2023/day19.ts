import * as fs from 'fs'

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

console.log(getSum(filterParts(input)))
