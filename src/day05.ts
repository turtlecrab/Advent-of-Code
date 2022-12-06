import * as fs from 'fs'
import { cloneDeep } from 'lodash'

export type State = string[][]

export type Move = {
  from: number
  to: number
  amount: number
}

const input = fs
  .readFileSync(__dirname + '/day05.input.txt', 'utf8')
  .replace(/\r/g, '')

export function getStateSize(rawState: string): number {
  return Number(rawState.match(/\s+(\d+)\s+$/)![1])
}

export function parseState(rawState: string): State {
  const colSize = getStateSize(rawState)
  const rows = rawState.split('\n')
  rows.pop()
  rows.reverse()

  const result: State = []
  for (let column = 0; column < colSize; column++) {
    result.push([])
    for (let row of rows) {
      const char = row[column * 4 + 1]
      if (/[A-Z]/.test(char)) {
        result[column].push(char)
      }
    }
  }
  return result
}

export function parseMove(str: string): Move {
  const match = str.match(/move (\d+) from (\d+) to (\d+)/)
  if (!match) throw new Error('parsing error')

  const [_, amount, from, to] = match.map(Number)

  return {
    from,
    to,
    amount,
  }
}

// TODO: immutable state w/ reducer-like actions?
export function makeMoveByOne(state: State, move: Move): void {
  for (let _ = 0; _ < move.amount; _++) {
    const taken = state[move.from - 1].pop() as string
    state[move.to - 1].push(taken)
  }
}

export function makeMoveWhole(state: State, move: Move): void {
  const taken = state[move.from - 1].splice(-move.amount)
  state[move.to - 1].push(...taken)
}

export function getTopCratesString(state: State): string {
  return state.map(col => col[col.length - 1]).join('')
}

const [rawState, rawMoves] = input.split('\n\n')

const initialState = parseState(rawState)
const moves = rawMoves.split('\n').map(parseMove)

// PART ONE
const state1 = cloneDeep(initialState)
moves.forEach(move => makeMoveByOne(state1, move))
console.log(getTopCratesString(state1))

// PART TWO
const state2 = cloneDeep(initialState)
moves.forEach(move => makeMoveWhole(state2, move))
console.log(getTopCratesString(state2))
