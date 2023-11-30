import * as fs from 'fs'
import { cloneDeep } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day11.input.txt', 'utf8')
  .replace(/\r/g, '')

type Operation = {
  type: 'add' | 'mult' | 'square'
  payload?: number
}

type MonkeyState = {
  items: number[]
  operation: Operation
  test: {
    num: number
    throwTrue: number
    throwFalse: number
  }
}

export function parseMonkeys(str: string): MonkeyState[] {
  const rawMonkey = str.split('\n\n')

  return rawMonkey.map(raw => {
    const items = raw
      .match(/Starting items: (.*)\n/)[1]
      .split(', ')
      .map(Number)

    const [operType, operPayload] = raw
      .match(/Operation: new = old (.*)\n/)[1]
      .split(' ')

    let operation: Operation
    if (operPayload === 'old') {
      operation = { type: 'square' }
    } else if (operType === '+') {
      operation = { type: 'add', payload: Number(operPayload) }
    } else if (operType === '*') {
      operation = { type: 'mult', payload: Number(operPayload) }
    } else {
      throw new Error(`Can\'t parse: ${operType} ${operPayload}`)
    }
    const testNum = Number(raw.match(/Test: divisible by (\d+)\n/)[1])
    const testTrue = Number(raw.match(/If true: throw to monkey (\d+)\n/)[1])
    const testFalse = Number(raw.match(/If false: throw to monkey (\d+)$/)[1])

    return {
      items,
      operation,
      test: {
        num: testNum,
        throwTrue: testTrue,
        throwFalse: testFalse,
      },
    }
  })
}

export function computeInspections(
  initialMonkeys: MonkeyState[],
  rounds: number = 20,
  relief: boolean = true
): number[] {
  const monkeys = cloneDeep(initialMonkeys)

  const inspections: number[] = Array(monkeys.length).fill(0)

  const denominator = monkeys.map(m => m.test.num).reduce((a, b) => a * b)

  for (let i = 0; i < rounds; i++) {
    for (let monkeyIndex in monkeys) {
      const monkey = monkeys[monkeyIndex]

      while (monkey.items.length) {
        let worry = monkey.items.shift()

        // Monkey inspects
        switch (monkey.operation.type) {
          case 'square':
            worry **= 2
            break
          case 'mult':
            worry *= monkey.operation.payload
            break
          case 'add':
            worry += monkey.operation.payload
            break
          default:
            throw new Error(`Unknown operation: ${monkey.operation}`)
        }
        // Monkey bored
        if (relief) {
          worry = Math.floor(worry / 3)
        }
        // Test
        worry = worry % denominator
        if (worry % monkey.test.num === 0) {
          monkeys[monkey.test.throwTrue].items.push(worry)
        } else {
          monkeys[monkey.test.throwFalse].items.push(worry)
        }
        // Count inspection
        inspections[monkeyIndex] += 1
      }
    }
  }
  return inspections
}

export function getMonkeyBusiness(inspections: number[]): number {
  const sorted = [...inspections].sort((a, b) => b - a)
  return sorted[0] * sorted[1]
}

console.log(getMonkeyBusiness(computeInspections(parseMonkeys(input))))
console.log(
  getMonkeyBusiness(computeInspections(parseMonkeys(input), 10000, false))
)
