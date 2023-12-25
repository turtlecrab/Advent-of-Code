import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day25.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseGraph(input: string) {
  const graph = new Map<string, Set<string>>()
  const edges = new Set<string>()

  for (let line of input.split('\n')) {
    const [id, right] = line.split(': ')
    const paths = right.split(' ')

    for (let node of [id, ...paths]) {
      if (!graph.has(node)) {
        graph.set(node, new Set<string>())
      }
    }

    for (let path of paths) {
      graph.get(id).add(path)
      graph.get(path).add(id)

      const key = [id, path].sort().join('-')
      edges.add(key)
    }
  }
  return { graph, edges }
}

export function getIsolatedCountProduct(
  graph: Map<string, Set<string>>,
  edgesToRemove: string[]
) {
  for (let edge of edgesToRemove) {
    const [source, target] = edge.split('-')
    graph.get(source).delete(target)
    graph.get(target).delete(source)
  }
  const start = edgesToRemove[0].split('-')[0]

  const visited = new Set<string>()

  const nodes = [start]

  while (nodes.length) {
    const cur = nodes.pop()

    visited.add(cur)

    for (let next of graph.get(cur)) {
      if (!visited.has(next)) {
        nodes.push(next)
      }
    }
  }
  return visited.size * (graph.size - visited.size)
}

/**
 * edges found via visualizer: https://aoc-visuals.netlify.app/2023/day25
 * https://github.com/turtlecrab/Advent-of-Code/tree/visualizations/app/2023/day25
 *
 * TODO
 */
const edgesToRemove = ['cvx-tvj', 'fsv-spx', 'kdk-nct']

console.log(getIsolatedCountProduct(parseGraph(input).graph, edgesToRemove))
