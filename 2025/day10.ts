import { Queue } from 'datastructures-js'
import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day10.input.txt', 'utf8')
  .replace(/\r/g, '')

type Machine = {
  target: number
  buttons: number[]
  unknown: number[]
}

export function parse(input: string): Machine[] {
  return input.split('\n').map(line => {
    const [_, target, buttons, unknown] = line.match(
      /^\[(.+)\]\s(.+)\s\{(.+)\}$/
    )

    return {
      target: [...target].reduce(
        (acc, cur, i) => acc + (cur === '#' ? 2 ** i : 0),
        0
      ),
      buttons: buttons.split(' ').map(s =>
        s
          .slice(1, -1)
          .split(',')
          .map(Number)
          .reduce((acc, n) => acc + 2 ** n, 0)
      ),
      unknown: unknown.split(',').map(Number),
    }
  })
}

export function findShortest(target: number, buttons: number[]) {
  type State = {
    state: number
    distance: number
    buttonsAvailable: number[]
    buttonsPressed: number[]
  }

  const queue = new Queue([
    {
      state: 0,
      distance: 0,
      buttonsAvailable: buttons,
      buttonsPressed: [],
    },
  ])

  const visited = new Set<number>()

  while (queue.size()) {
    const cur = queue.pop()

    if (visited.has(cur.state)) continue

    if (cur.state === target) {
      return cur
    }

    visited.add(cur.state)

    for (let btn of cur.buttonsAvailable) {
      const nextState: State = {
        distance: cur.distance + 1,
        state: cur.state ^ btn,
        buttonsPressed: [...cur.buttonsPressed, btn],
        buttonsAvailable: cur.buttonsAvailable.filter(b => b !== btn),
      }
      queue.enqueue(nextState)
    }
  }
}

export function getSum(machines: Machine[]) {
  return machines
    .map(m => findShortest(m.target, m.buttons).distance)
    .reduce((a, b) => a + b)
}

console.time('p1')
console.log(getSum(parse(input)))
console.timeEnd('p1')
