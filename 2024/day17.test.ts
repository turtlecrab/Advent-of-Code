import { execute, findQuine, parseProgram } from './day17'

const testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

const testInput2 = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`

describe('execute', () => {
  it('works for test input', () => {
    expect(execute(...parseProgram(testInput)).join()).toBe(
      '4,6,3,5,6,3,5,2,1,0'
    )
  })
})

describe('findQuine', () => {
  it('works for test input', () => {
    expect(findQuine(parseProgram(testInput2)[1])).toBe(117440)
  })
})
