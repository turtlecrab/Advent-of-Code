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

export function getNewPositions(
  head: Position,
  tail: Position,
  move: Move
): { head: Position; tail: Position } {
  const moveVector: Position = {
    x: move.direction === 'R' ? 1 : move.direction === 'L' ? -1 : 0,
    y: move.direction === 'U' ? 1 : move.direction === 'D' ? -1 : 0,
  }
  let nextHead: Position = {
    ...head,
  }
  let nextTail: Position = {
    ...tail,
  }
  for (let i = 0; i < move.amount; i++) {
    nextHead = {
      x: nextHead.x + moveVector.x,
      y: nextHead.y + moveVector.y,
    }
    if (Math.abs(nextHead.x - nextTail.x) > 1) {
      nextTail = {
        x: nextHead.x - moveVector.x,
        y: nextHead.y,
      }
    } else if (Math.abs(nextHead.y - nextTail.y) > 1) {
      nextTail = {
        x: nextHead.x,
        y: nextHead.y - moveVector.y,
      }
    }
  }
  return { head: nextHead, tail: nextTail }
}

export function getTailVisitedPositions(moves: Move[]): number {
  let head: Position = { x: 0, y: 0 }
  let tail: Position = { x: 0, y: 0 }

  const serialize = (pos: Position) => `${pos.x}:${pos.y}`

  const visited = new Set<string>()
  visited.add(serialize(tail))

  for (let move of moves) {
    for (let _ = 0; _ < move.amount; _++) {
      const newPos = getNewPositions(head, tail, { ...move, amount: 1 })
      head = newPos.head
      tail = newPos.tail

      visited.add(serialize(tail))
    }
  }
  return visited.size
}

console.log(getTailVisitedPositions(parseMoves(input)))
