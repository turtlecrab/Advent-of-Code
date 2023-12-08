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

console.log(play(...parseAll(input)))
