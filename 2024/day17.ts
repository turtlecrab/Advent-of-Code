import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day17.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseProgram(
  input: string
): [Record<string, number>, number[]] {
  const [registers, program] = input.split('\n\n')

  return [
    registers.split('\n').reduce((acc, cur) => {
      const [, name, value] = cur.match(/^Register (\w+): (\d+)$/)
      acc[name] = Number(value)
      return acc
    }, {} as Record<string, number>),
    program.split(': ')[1].split(',').map(Number),
  ]
}

const op = ['adv', 'bxl', 'bst', 'jnz', 'bxc', 'out', 'bdv', 'cdv'] as const

export function execute(
  { A, B, C }: Record<string, number>,
  program: number[],
  checkQuine = false
): number[] {
  const out: number[] = []

  const combo = (operand: number) =>
    operand === 4 ? A : operand === 5 ? B : operand === 6 ? C : operand

  let pointer = 0

  const visited = new Set<string>()
  const key = (...nums: number[]) => nums.join()

  if (A % 100_000 === 0) {
    console.log('A:', A)
  }

  while (pointer < program.length) {
    if (checkQuine) {
      if (visited.has(key(A, B, C, pointer))) {
        console.log('looping')
        return [NaN]
      }
      visited.add(key(A, B, C, pointer))
    }

    const [opcode, operand] = program.slice(pointer, pointer + 2)

    switch (op[opcode]) {
      case 'adv':
        A = Math.floor(A / 2 ** combo(operand))
        break
      case 'bxl':
        B = B ^ operand
        break
      case 'bst':
        B = combo(operand) % 8
        break
      case 'jnz':
        if (A) pointer = operand - 2
        break
      case 'bxc':
        B = B ^ C
        break
      case 'out':
        out.push(combo(operand) % 8)

        if (checkQuine && !program.join().startsWith(out.join())) {
          return [NaN]
        }
        break
      case 'bdv':
        B = Math.floor(A / 2 ** combo(operand))
        break
      case 'cdv':
        C = Math.floor(A / 2 ** combo(operand))
        break
      default:
        console.log('default')
        return [NaN]
    }
    pointer += 2
  }

  return out
}

export function findQuine(program: number[]): number {
  for (let A = 0; ; A++) {
    const out = execute({ A, B: 0, C: 0 }, program, true)

    if (out.join() === program.join()) {
      return A
    }
  }

  return NaN
}

console.log(execute(...parseProgram(input)).join())
console.log(findQuine(parseProgram(input)[1]))
