import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day09.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

type Dirs = 'L' | 'R' | 'U' | 'D'

type Move = {
  direction: Dirs
  amount: number
}

export function parseMoves(str: string): Move[] {
  return str.split('\n').map(line => {
    const [direction, amount] = line.split(' ')
    return {
      direction: direction as Dirs,
      amount: Number(amount),
    }
  })
}

export function getNextHead(head: Position, direction: Dirs): Position {
  const moveVector = {
    x: direction === 'R' ? 1 : direction === 'L' ? -1 : 0,
    y: direction === 'U' ? 1 : direction === 'D' ? -1 : 0,
  }
  return {
    x: head.x + moveVector.x,
    y: head.y + moveVector.y,
  }
}

export function getNextTail(nextHead: Position, tail: Position): Position {
  const stretchVector = {
    x: nextHead.x - tail.x,
    y: nextHead.y - tail.y,
  }
  if (Math.abs(stretchVector.x) > 1 && Math.abs(stretchVector.y) > 1) {
    return {
      x: (tail.x + nextHead.x) * 0.5,
      y: (tail.y + nextHead.y) * 0.5,
    }
  }
  if (Math.abs(stretchVector.x) > 1) {
    return {
      x: nextHead.x - Math.sign(stretchVector.x),
      y: nextHead.y,
    }
  }
  if (Math.abs(stretchVector.y) > 1) {
    return {
      x: nextHead.x,
      y: nextHead.y - Math.sign(stretchVector.y),
    }
  }
  return { ...tail }
}

export function getTailVisitedPositions(
  moves: Move[],
  length: number
): Set<string> {
  const rope: Position[] = Array(length)
    .fill({ x: 0, y: 0 })
    .map(obj => ({ ...obj })) // not needed but feels right

  const visited = new Set<string>()
  const serialize = (pos: Position) => `${pos.x}:${pos.y}`

  visited.add(serialize(rope.at(-1)))

  for (let move of moves) {
    for (let _i = 0; _i < move.amount; _i++) {
      rope[0] = getNextHead(rope[0], move.direction)
      for (let j = 1; j < rope.length; j++) {
        rope[j] = getNextTail(rope[j - 1], rope[j])
      }

      visited.add(serialize(rope.at(-1)))
    }
  }
  return visited
}

console.log(getTailVisitedPositions(parseMoves(input), 2).size)
console.log(getTailVisitedPositions(parseMoves(input), 10).size)
