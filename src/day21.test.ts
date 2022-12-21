import { getYell, parseMonkeys } from './day21'

const testInput = `root: pppw + sjmn
dbpl: 5
cczh: sllz + lgvd
zczc: 2
ptdq: humn - dvpt
dvpt: 3
lfqf: 4
humn: 5
ljgn: 2
sjmn: drzm * dbpl
sllz: 4
pppw: cczh / lfqf
lgvd: ljgn * ptdq
drzm: hmdt - zczc
hmdt: 32`

describe('parseMonkeys', () => {
  it('parses', () => {
    expect(parseMonkeys(testInput).ljgn).toBe('2')
    expect(parseMonkeys(testInput).ptdq).toBe('humn - dvpt')
  })
})

describe('getYell', () => {
  it('gets the root yell', () => {
    expect(getYell(parseMonkeys(testInput))).toBe(152)
  })
})
