import {
  canGo,
  parseStartEnd,
  parseGraph,
  getShortestPath,
  parseReverseGraph,
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
    const graph = parseGraph(testInput)

    expect(graph).toHaveLength(40)
    expect(
      graph.find(n => n.position.x === 1 && n.position.y === 1).edges.length
    ).toBe(4)
    expect(
      graph.find(n => n.position.x === 2 && n.position.y === 3).edges.length
    ).toBe(3)
  })
})

describe('getShortestPath', () => {
  it('gets it', () => {
    const graph = parseGraph(testInput)
    const { start, end } = parseStartEnd(testInput)

    expect(getShortestPath(graph, start, end)).toBeTruthy()
    expect(getShortestPath(graph, start, end)).toHaveLength(31)
  })
})

describe('getShortestPathFromTop', () => {
  it('gets it 🗻', () => {
    const graph = parseReverseGraph(testInput)
    const { end } = parseStartEnd(testInput)

    expect(getShortestPathFromTop(graph, end)).toHaveLength(29)
  })
})
