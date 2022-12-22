import * as fs from 'fs'
import { cloneDeep } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day22.input.txt', 'utf8')
  .replace(/\r/g, '')

export enum Facing {
  Right,
  Down,
  Left,
  Up,
}

enum Tile {
  Void = ' ',
  Empty = '.',
  Wall = '#',
}

type Map = Tile[][]

type Move = {
  steps: number
  turn: 'R' | 'L' | ''
}

type Position = {
  x: number
  y: number
}

export function parseInput(str: string): { map: Map; moves: Move[] } {
  let [rawMap, rawMoves] = str.split('\n\n')

  let map = rawMap.split('\n').map(row => row.split('')) as Map
  const maxWidth = Math.max(...map.map(r => r.length))
  map = map.map(r => [
    ...r,
    ...Array(maxWidth - r.length).fill(Tile.Void),
  ]) as Map

  const moves: Move[] = []

  while (rawMoves) {
    const [, num, turn] = rawMoves.match(/^(\d+)([RL]?)/)
    moves.push({
      steps: Number(num),
      turn: turn as 'R' | 'L' | '',
    })
    rawMoves = rawMoves.slice(num.length + turn.length)
  }

  return { map, moves }
}

export function getStartingPosition(map: Map): Position {
  return {
    x: map[0].findIndex(tile => tile === Tile.Empty),
    y: 0,
  }
}

/**
 * @returns position after 1 step
 */
export function getNextPosition(
  map: Map,
  player: Position,
  facing: Facing
): Position {
  let dx = 0
  let dy = 0

  if (facing === Facing.Right) {
    dx = 1
  } else if (facing === Facing.Down) {
    dy = 1
  } else if (facing === Facing.Left) {
    dx = -1
  } else if (facing === Facing.Up) {
    dy = -1
  }

  let xOffset = 0
  let yOffset = 0

  while (true) {
    // TODO: make less wtf
    xOffset =
      ((player.x + xOffset + dx + map[0].length) % map[0].length) - player.x
    yOffset = ((player.y + yOffset + dy + map.length) % map.length) - player.y

    const curTile = map[player.y + yOffset][player.x + xOffset]

    if (curTile === Tile.Empty) {
      return {
        x: player.x + xOffset,
        y: player.y + yOffset,
      }
    }
    if (curTile === Tile.Wall) {
      return player
    }
  }
}

export function play(
  map: Map,
  player: Position,
  moves: Move[]
): { position: Position; facing: Facing } {
  let position = player
  let facing = Facing.Right

  for (let move of moves) {
    // move
    for (let i = 0; i < move.steps; i++) {
      position = getNextPosition(map, position, facing)
    }
    // turn
    if (move.turn === 'R') {
      facing = (facing + 1) % 4
    } else if (move.turn === 'L') {
      facing = (facing - 1 + 4) % 4
    }
  }
  return { position, facing }
}

export function getPassword(row: number, col: number, facing: Facing): number {
  return (row + 1) * 1000 + (col + 1) * 4 + facing
}

export function printMap(
  map: Map | any,
  player?: Position,
  facing?: Facing
): void {
  if (player) {
    const f = ['👉', '🔻', '👈', '👆']
    map = cloneDeep(map)
    map[player.y][player.x] = f[facing]
  }

  console.log(
    map
      .map(row => row.join(''))
      .join('\n')
      .replace(/ /g, '⬛')
      .replace(/\./g, '⬜')
      .replace(/#/g, '🟧')
      .replace(/P/g, '❎')

    // 🟥🟧🟨🟩🟦🟪🟫⬛⬜🔲⏹❎
  )
}

const { map, moves } = parseInput(input)
const player = getStartingPosition(map)
const { position, facing } = play(map, player, moves)
console.log(getPassword(position.y, position.x, facing))
