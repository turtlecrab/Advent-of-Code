import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day13.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec = {
  x: number
  y: number
}

const subtractVec = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y })
const multiplyVec = (n: number, v: Vec) => ({ x: n * v.x, y: n * v.y })

type Machine = {
  a: Vec
  b: Vec
  prize: Vec
}

export function parseMachines(input: string): Machine[] {
  const machines = input.split('\n\n').map(lines =>
    lines.split('\n').map(line => {
      const [, x, y] = line
        .replace(/=/g, '+')
        .match(/: X\+(\d+), Y\+(\d+)/)
        .map(Number)
      return { x, y }
    })
  )
  return machines.map(v => ({ a: v[0], b: v[1], prize: v[2] }))
}

export function findCheapestWin({ a, b, prize }: Machine): number {
  for (let countA = 0; countA <= 100; countA++) {
    const remaining = subtractVec(prize, multiplyVec(countA, a))

    const countBX = remaining.x / b.x
    const countBY = remaining.y / b.y

    if (countBX === countBY && countBX === Math.floor(countBX)) {
      return countA * 3 + countBX
    }
  }
  return 0
}

export function getTokensSum(machines: Machine[]): number {
  return machines.map(findCheapestWin).reduce((a, b) => a + b)
}

console.log(getTokensSum(parseMachines(input)))
