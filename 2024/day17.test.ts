import { execute, parseProgram } from './day17'

const testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`

describe('execute', () => {
  it('works for test input', () => {
    expect(execute(...parseProgram(testInput)).join()).toBe(
      '4,6,3,5,6,3,5,2,1,0'
    )
  })
})
