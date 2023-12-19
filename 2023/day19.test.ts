import {
  parseAll,
  process,
  filterParts,
  getSum,
  processRange,
  Range,
  getAcceptedRanges,
  getCombinations,
} from './day19'

const testInput = `
px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`.trim()

describe('parseAll', () => {
  it('parses', () => {
    const { parts, workflows } = parseAll(testInput)
    expect(parts.length).toBe(5)
    expect(parts[0]).toEqual({ x: 787, m: 2655, a: 1222, s: 2876 })
    expect(parts[1]).toEqual({ x: 1679, m: 44, a: 2067, s: 496 })
    expect(workflows.size).toBe(11)
    expect(workflows.get('px').get('a<2006')).toBe('qkq')
    expect(workflows.get('hdj').get('goto')).toBe('pv')
  })
})

describe('process', () => {
  it('processes a part through a workflow', () => {
    const { parts, workflows } = parseAll(testInput)
    expect(process(parts[0], workflows.get('in'))).toBe('qqz')
    expect(process(parts[0], workflows.get('qqz'))).toBe('qs')
    expect(process(parts[0], workflows.get('qs'))).toBe('lnx')
    expect(process(parts[0], workflows.get('lnx'))).toBe('A')
  })
})

describe('filterParts', () => {
  it('filters accepted parts', () => {
    const parts = filterParts(testInput)
    expect(parts).toHaveLength(3)
  })
})

describe('getSum', () => {
  it('sums', () => {
    const parts = filterParts(testInput)
    expect(getSum(parts)).toBe(19114)
  })
})

describe('processRange', () => {
  it('does stuff', () => {
    const { workflows } = parseAll(testInput)
    const rule = 'px'

    const range: Range = {
      x: [1, 4001],
      m: [1, 4001],
      a: [1, 4001],
      s: [1, 4001],
      next: rule,
    }

    const next = processRange(range, workflows)
    // console.log(workflows.get(rule))
    // console.log(next)
    expect(next.every(r => ['qkq', 'A', 'rfg'].includes(r.next))).toBe(true)
  })
})

describe('getAcceptedRanges', () => {
  it('gets it', () => {
    const ranges = getAcceptedRanges(testInput)
    expect(ranges.every(r => r.next === 'A')).toBe(true)
  })
})

describe('getCombinations', () => {
  it('does stuff', () => {
    const ranges = getAcceptedRanges(testInput)
    expect(getCombinations(ranges)).toBe(167409079868000)
  })
})
