import fs from 'fs'
import { cloneDeep } from 'lodash'
import { test, testShallow } from './utils'

type State = string[][]

type Move = {
  from: number
  to: number
  amount: number
}

const input = fs.readFileSync('./day05.input.txt', 'utf8')

// TODO: parse initial state too
const initialState: State = [
  ['N', 'D', 'M', 'Q', 'B', 'P', 'Z'],
  ['C', 'L', 'Z', 'Q', 'M', 'D', 'H', 'V'],
  ['Q', 'H', 'R', 'D', 'V', 'F', 'Z', 'G'],
  ['H', 'G', 'D', 'F', 'N'],
  ['N', 'F', 'Q'],
  ['D', 'Q', 'V', 'Z', 'F', 'B', 'T'],
  ['Q', 'M', 'T', 'Z', 'D', 'V', 'S', 'H'],
  ['M', 'G', 'F', 'P', 'N', 'Q'],
  ['B', 'W', 'R', 'M'],
]

function parseMove(str: string): Move {
  const match = str.match(/move (\d+) from (\d+) to (\d+)/)
  if (!match) throw new Error('parsing error')

  const [_, amount, from, to] = match.map(Number)

  return {
    from,
    to,
    amount,
  }
}
// testShallow(parseMove('move 3 from 2 to 5'), { repeat: 3, from: 2, to: 5 })
// testShallow(parseMove('move 2 from 9 to 6'), { repeat: 2, from: 9, to: 6 })
// testShallow(parseMove('move 14 from 700 to 1'), {
//   repeat: 14,
//   from: 700,
//   to: 1,
// })
// testShallow(parseMove('move 001 from 3 to 4'), { repeat: 1, from: 3, to: 4 })
// testShallow(parseMove('move 99999 from 9 to 8'), {
//   repeat: 99999,
//   from: 9,
//   to: 8,
// })

// TODO: immutable state w/ reducer-like actions?
function makeMoveByOne(state: State, move: Move): void {
  for (let _ = 0; _ < move.amount; _++) {
    const taken = state[move.from - 1].pop() as string
    state[move.to - 1].push(taken)
  }
}

function makeMoveWhole(state: State, move: Move): void {
  const taken = state[move.from - 1].splice(-move.amount)
  state[move.to - 1].push(...taken)
}

function getTopCratesString(state: State): string {
  return state.map(col => col[col.length - 1]).join('')
}
// const testState1 = [['Z', 'N'], ['M', 'C', 'D'], ['P']]
// const testState2 = cloneDeep(testState1)
// const testInput = `move 1 from 2 to 1
// move 3 from 1 to 3
// move 2 from 2 to 1
// move 1 from 1 to 2`
// const testMoves = testInput.split('\n').map(parseMove)
// testMoves.forEach((move) => makeMoveByOne(testState1, move))
// test(getTopCratesString(testState1), 'CMZ')
// testMoves.forEach((move) => makeMoveWhole(testState2, move))
// test(getTopCratesString(testState2), 'MCD')

const moves = input.split('\n').map(parseMove)

// PART ONE
const state1 = cloneDeep(initialState)
moves.forEach(move => makeMoveByOne(state1, move))
console.log(getTopCratesString(state1))
// // test(getTopCratesString(state1), 'QGTHFZBHV')

// PART TWO
const state2 = cloneDeep(initialState)
moves.forEach(move => makeMoveWhole(state2, move))
console.log(getTopCratesString(state2))
// test(getTopCratesString(state1), 'QGTHFZBHV')
