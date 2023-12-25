import { getIsolatedCountProduct, parseGraph } from './day25'

const testInput = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`

describe('parseGraph', () => {
  it('parses', () => {
    const { graph } = parseGraph(testInput)

    expect(graph.size).toBe(15)
  })
})

describe('getIsolatedCountProduct', () => {
  it('gets it', () => {
    const { graph } = parseGraph(testInput)
    const edgesToRemove = ['nvd-jqt', 'bvb-cmg', 'pzl-hfx'] // TODO

    expect(getIsolatedCountProduct(graph, edgesToRemove)).toBe(54)
  })
})
