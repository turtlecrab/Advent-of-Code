import {
  canGo,
  parseStartEnd,
  parseGraph,
  getShortestPath,
  getShortestPathFromTop,
} from './day12'

const testInput = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`

describe('canGo', () => {
  it('returns proper stuff', () => {
    expect(canGo('a', 'a')).toBe(true)
    expect(canGo('a', 'b')).toBe(true)
    expect(canGo('a', 'c')).toBe(false)
    expect(canGo('a', 'z')).toBe(false)
    expect(canGo('b', 'a')).toBe(true)
  })
})

describe('parseStartEnd', () => {
  it('parses start & end positions', () => {
    expect(parseStartEnd(testInput)).toEqual({
      start: { x: 0, y: 0 },
      end: { x: 5, y: 2 },
    })
  })
})

describe('parseGraph', () => {
  it('parses directional graph', () => {
    const graph = parseGraph(testInput, canGo)

    expect(Object.keys(graph)).toHaveLength(40)
    expect(graph['1:1'].edges).toHaveLength(4)
    expect(graph['2:3'].edges).toHaveLength(3)
  })
})

describe('getShortestPath', () => {
  it('gets it', () => {
    const graph = parseGraph(testInput, canGo)
    const { start, end } = parseStartEnd(testInput)

    expect(getShortestPath(graph, start, end)).toBeTruthy()
    expect(getShortestPath(graph, start, end)).toHaveLength(31)
  })
})

describe('getShortestPathFromTop', () => {
  it('gets it 🗻', () => {
    const graph = parseGraph(testInput, (to, from) => canGo(from, to))
    const { end } = parseStartEnd(testInput)

    expect(getShortestPathFromTop(graph, end)).toHaveLength(29)
  })
})
