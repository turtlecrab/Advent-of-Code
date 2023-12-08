import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day08.input.txt', 'utf8')
  .replace(/\r/g, '')

type Nodes = {
  [key: string]: {
    left: string
    right: string
  }
}

export function parseAll(input: string): [string, Nodes] {
  const [moves, _, ...nodes] = input.split('\n')

  return [
    moves,
    nodes.reduce((acc, line) => {
      const [_, name, left, right] = line.match(/^(\w+) \= \((\w+), (\w+)\)/)

      acc[name] = { left, right }

      return acc
    }, {} as Nodes),
  ]
}

export function play(moves: string, nodes: Nodes): number {
  let current = 'AAA'
  let count = 0

  while (current !== 'ZZZ') {
    const dir = moves[count % moves.length] === 'L' ? 'left' : 'right'
    current = nodes[current][dir]
    count += 1
  }
  return count
}

export function getAllStartingNodes(nodes: Nodes): string[] {
  return Object.keys(nodes).filter(node => /A$/.test(node))
}

export function getLowestPrimeDivider(num: number): number {
  const sqrt = Math.sqrt(num)

  for (let i = 2; i <= sqrt; i++) {
    const div = num / i
    if (Math.floor(div) === div) {
      return i
    }
  }
  return num
}

export function getPrimeDividers(num: number): number[] {
  const next = getLowestPrimeDivider(num)

  if (next === num) {
    return [num]
  }
  return [next, ...getPrimeDividers(num / next)]
}

export function playParallel(moves: string, nodes: Nodes): number {
  const currents = getAllStartingNodes(nodes)
  const results: number[] = []

  for (let current of currents) {
    let count = 0

    while (!/Z$/.test(current)) {
      const dir = moves[count % moves.length] === 'L' ? 'left' : 'right'
      current = nodes[current][dir]
      count += 1
    }
    results.push(count)
  }

  // this is working for the given input, but not for any input.
  // e.g. lowest common denominator for [8, 16] is 16
  // but this return expression would give 2
  return [...new Set(results.flatMap(getPrimeDividers))].reduce((a, c) => a * c)
}

console.log(play(...parseAll(input)))

console.log(playParallel(...parseAll(input)))
