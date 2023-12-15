import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day15.input.txt', 'utf8')
  .replace(/\r/g, '')

export function hash(str: string): number {
  return [...str].reduce(
    (acc, char) => ((acc + char.charCodeAt(0)) * 17) % 256,
    0
  )
}

export function getHashSum(input: string): number {
  return input
    .split(',')
    .map(hash)
    .reduce((a, b) => a + b)
}

type Box = Map<string, number>

export function calculateFocusingPower(boxes: Box[]): number {
  return boxes
    .map((box, i) =>
      [...box.values()]
        .map((value, j) => (i + 1) * (j + 1) * value)
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b)
}

export function process(input: string): Box[] {
  const commands = input.split(',')

  const boxes = Array(256)
    .fill(null)
    .map(() => new Map<string, number>())

  for (let command of commands) {
    const [label, value] = command.split(/[=-]/)
    const box = boxes[hash(label)]

    if (command.includes('-')) {
      box.delete(label)
    } else {
      box.set(label, Number(value))
    }
  }
  return boxes
}

console.log(getHashSum(input))

console.log(calculateFocusingPower(process(input)))
