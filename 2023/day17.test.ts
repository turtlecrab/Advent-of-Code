import { parseMap, play, reverseBFS } from './day17'

const testInput = `
2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`.trim()

const testResult = `
2>>34^>>>1323
32v>>>35v5623
32552456v>>54
3446585845v52
4546657867v>6
14385987984v4
44578769877v6
36378779796v>
465496798688v
456467998645v
12246868655<v
25465488877v5
43226746555v>`.trim()

const testInput2 = `
241
321
325`.trim()

const testInput3 = `
2413432311323
3215453535623
3255245654254`.trim()

const testInput4 = `
1111111111111
1999999999991
1199999999994`.trim()

const testInput5 = `
11111111111111
11111111111111
11111111111111
66999999999999
66999999999999
66999999999999
66999999999999
66999999999999
11999999999999
91999999999999
11999999999999
59999999999999
11111111111111
11111111111111`.trim()

const testInput6 = `
11199
12199
99199
99131
99111`.trim()

function print(state: any, map: number[][]): string {
  const path: any = map.map(row => [...row])
  while (state) {
    path[state.pos.y][state.pos.x] = ['^', '>', 'v', '<'][state.dir]
    state = state.via
  }
  return path.map(row => row.join('')).join('\n')
}

describe('play', () => {
  it('sworks for test input', () => {
    expect(play(parseMap(testInput)).heat).toBe(102)
  })
  it('test case from reddit #1', () => {
    expect(play(parseMap(testInput5)).heat).toBe(68)
  })
  it('test case from reddit #2', () => {
    expect(play(parseMap(testInput6)).heat).toBe(9)
  })
})
