import * as fs from 'fs'
import { cloneDeep } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day17.input.txt', 'utf8')
  .replace(/\r/g, '')

enum Tile {
  Empty,
  Wall,
  Rock,
}

type Vec = {
  x: number
  y: number
}

type Row = Tile[]

type State = {
  rows: Row[]
  rockShape: number
  rockPosition: Vec | null
}

const shapes = [
  ['0:0', '1:0', '2:0', '3:0'], // _
  ['0:1', '1:0', '1:1', '1:2', '2:1'], // +
  ['0:0', '1:0', '2:0', '2:1', '2:2'], // ⅃
  ['0:0', '0:1', '0:2', '0:3'], // |
  ['0:0', '1:0', '0:1', '1:1'], // ■
]

export function getEmptyRowsCount(rows: Row[]): number {
  let count = 0
  while (
    rows.at(-1 - count) &&
    rows
      .at(-1 - count)
      .slice(1, -1)
      .every(tile => tile === Tile.Empty)
  ) {
    count += 1
  }
  return count
}

export function isColliding(
  rows: Row[],
  position: Vec,
  shape: number
): boolean {
  const pixels = shapes[shape]
  for (let pixel of pixels) {
    const [pixelX, pixelY] = pixel.split(':').map(Number)

    const x = position.x + pixelX
    const y = position.y + pixelY

    if (rows[y][x] !== Tile.Empty) {
      return true
    }
  }
  return false
}

export function simulate(
  windPattern: string,
  rocksCount: number = 2022,
  caveWidth: number = 7
): State {
  const initialState: State = {
    rows: [Array(caveWidth + 2).fill(Tile.Wall)],
    rockShape: 0,
    rockPosition: null,
  }
  let state = initialState
  let windOffset = 0
  let landedRocks = 0

  while (landedRocks < rocksCount) {
    // if there is no rock throw next one
    if (state.rockPosition === null) {
      // check for available space
      // 7 = 3 + 4; 3 as required, 4 for the rock
      const emptyRowsNeeded = 7 - getEmptyRowsCount(state.rows)

      for (let i = 0; i < emptyRowsNeeded; i++) {
        state.rows.push([
          Tile.Wall,
          ...Array(caveWidth).fill(Tile.Empty),
          Tile.Wall,
        ])
      }
      state.rockPosition = {
        x: 3,
        y: state.rows.length - 4,
      }
    }

    // apply wind
    const wind = windPattern[windOffset]

    const afterWindPosition: Vec = {
      x: state.rockPosition.x + (wind === '>' ? 1 : -1),
      y: state.rockPosition.y,
    }
    if (!isColliding(state.rows, afterWindPosition, state.rockShape)) {
      state.rockPosition = afterWindPosition
    }
    windOffset = (windOffset + 1) % windPattern.length

    // apply gravitation
    const afterFallPosition: Vec = {
      x: state.rockPosition.x,
      y: state.rockPosition.y - 1,
    }
    if (isColliding(state.rows, afterFallPosition, state.rockShape)) {
      // land the rock
      const pixels = shapes[state.rockShape]
      for (let pixel of pixels) {
        const [pixelX, pixelY] = pixel.split(':').map(Number)
        const x = state.rockPosition.x + pixelX
        const y = state.rockPosition.y + pixelY
        state.rows[y][x] = Tile.Rock
      }
      state.rockPosition = null
      state.rockShape = (state.rockShape + 1) % shapes.length
      landedRocks += 1
    } else {
      // fall deeper
      state.rockPosition = afterFallPosition
    }
  }
  return state
}

export function printMap(state: State): void {
  const map: Row[] = cloneDeep(state.rows)
  if (state.rockPosition) {
    const pixels = shapes[state.rockShape]
    for (let pixelStr of pixels) {
      const [pixelX, pixelY] = pixelStr.split(':').map(Number)
      const x = state.rockPosition.x + pixelX
      const y = state.rockPosition.y + pixelY
      map[y][x] = 3
    }
  }
  console.log(
    map
      // .slice(-20)
      .reverse()
      .map(row => row.join(''))
      .join('\n')
      .replace(/0/g, '⬛')
      .replace(/1/g, '🟦')
      .replace(/2/g, '🟨')
      .replace(/3/g, '🟧')
  )
}

export function getTowerHeight(windPattern: string) {
  const finalState = simulate(windPattern)
  return finalState.rows.length - getEmptyRowsCount(finalState.rows) - 1
}

console.log(getTowerHeight(input))
