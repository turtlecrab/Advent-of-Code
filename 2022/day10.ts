import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day10.input.txt', 'utf8')
  .replace(/\r/g, '')

type CycleAction = {
  type: 'add' | 'none'
  payload?: number
}

export function parseAndFlat(str: string): CycleAction[] {
  return str.split('\n').flatMap(line => {
    const [cmd, payload] = line.split(' ')

    if (cmd === 'addx') {
      return [{ type: 'none' }, { type: 'add', payload: Number(payload) }]
    } else if (cmd === 'noop') {
      return { type: 'none' }
    } else {
      throw new Error('Parsing error, line: ' + line)
    }
  })
}

export function getVaules(actions: CycleAction[]): number[] {
  const values: number[] = []
  let current = 1

  for (let action of actions) {
    values.push(current)
    if (action.type === 'add') {
      current += action.payload
    }
  }
  return values
}

export function getSignalStrengthAtCycle(
  values: number[],
  cycle: number
): number {
  return cycle * values[cycle - 1]
}

export function getSpecialSum(values: number[]) {
  let sum = 0
  for (let i = 0; i < 6; i++) {
    const num = i * 40 + 20
    sum += getSignalStrengthAtCycle(values, num)
  }
  return sum
}

export function getPixels(values: number[], width: number): string[] {
  const spriteRadius = 2 // sprite width === 3

  return values.map((value, i) => {
    if (Math.abs(value - (i % width)) < spriteRadius) {
      return '#'
    }
    return '.'
  })
}

export function getScreen(pixels: string[], width: number): string {
  const screen = []
  while (pixels.length) {
    screen.push(pixels.splice(0, width).join(''))
  }
  return screen.join('\n')
}

console.log(getSpecialSum(getVaules(parseAndFlat(input))))
console.log(getScreen(getPixels(getVaules(parseAndFlat(input)), 40), 40))
