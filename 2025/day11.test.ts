import { getRoutes, parse } from './day11'

const testInput = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`

describe('Day11', () => {
  it('works for test input', () => {
    expect(getRoutes(parse(testInput))).toBe(5)
  })
})
