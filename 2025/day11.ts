import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day11.input.txt', 'utf8')
  .replace(/\r/g, '')

type Node = {
  id: string
  paths: string[]
}

export function parse(input: string) {
  return input
    .split('\n')
    .map(line => {
      const [id, paths] = line.split(': ')
      return {
        id,
        paths: paths.split(' '),
      }
    })
    .reduce((acc, cur) => {
      acc.set(cur.id, cur)
      return acc
    }, new Map<string, Node>())
}

export function getRoutes(nodes: Map<string, Node>) {
  let count = 0

  const stack = ['you']

  while (stack.length) {
    const cur = stack.pop()

    if (cur === 'out') {
      count += 1
      continue
    }
    const node = nodes.get(cur)

    for (let next of node.paths) {
      stack.push(next)
    }
  }

  return count
}

console.time('p1')
console.log(getRoutes(parse(input)))
console.timeEnd('p1')
