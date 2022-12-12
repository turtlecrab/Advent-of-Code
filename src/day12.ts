import * as fs from 'fs'
import { cloneDeep } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day12.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

type Node = {
  position: Position
  edges: Position[]
}

type Graph = Node[]

export function canGo(from: string, to: string): boolean {
  return to.charCodeAt(0) - from.charCodeAt(0) <= 1
}

export function parseStartEnd(str: string): { start: Position; end: Position } {
  let start: Position
  let end: Position

  const lines = str.split('\n')
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === 'S') start = { x, y }
      if (lines[y][x] === 'E') end = { x, y }
    }
  }
  return { start, end }
}

export function parseGraph(str: string): Graph {
  str = str.replace(/S/g, 'a').replace(/E/g, 'z')

  const lines = str.split('\n')
  const width = lines[0].length
  const height = lines.length

  const nodes: Graph = []

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      const char = lines[y][x]
      const position: Position = { x, y }
      const edges: Position[] = []

      if (y > 0 && canGo(char, lines[y - 1][x])) {
        edges.push({ x, y: y - 1 })
      }
      if (y < height - 1 && canGo(char, lines[y + 1][x])) {
        edges.push({ x, y: y + 1 })
      }
      if (x > 0 && canGo(char, lines[y][x - 1])) {
        edges.push({ x: x - 1, y })
      }
      if (x < width - 1 && canGo(char, lines[y][x + 1])) {
        edges.push({ x: x + 1, y })
      }

      nodes.push({
        position,
        edges,
      })
    }
  }
  return nodes
}

export function getShortestPath(
  graph: Graph,
  start: Position,
  end: Position
): Position[] {
  type CalcNode = Node & {
    cost: number
    via: CalcNode | null
  }

  const all: CalcNode[] = graph.map(node => ({
    ...cloneDeep(node),
    cost:
      node.position.x === start.x && node.position.y === start.y ? 0 : Infinity,
    via: null,
  }))

  const nodeHash = {}
  const getNode = (pos: Position) => {
    const key = `${pos.x}:${pos.y}`
    if (!nodeHash[key]) {
      nodeHash[key] = all.find(
        n => n.position.x === pos.x && n.position.y === pos.y
      )
    }
    return nodeHash[key]
  }

  const unvisited = [...all]

  while (unvisited.length) {
    unvisited.sort((a, b) => b.cost - a.cost)
    const current = unvisited.pop()

    if (current.cost === Infinity) {
      throw new Error(`Path not found, unvisited: ${unvisited.length}`)
    }

    const nextCost = current.cost + 1
    for (let edgePos of current.edges) {
      const edge = getNode(edgePos)

      if (nextCost < edge.cost) {
        edge.cost = nextCost
        edge.via = current
      }
    }
    // check if destination node is visited
    if (current.position.x === end.x && current.position.y === end.y) break
  }

  let destination = all.find(
    node => node.position.x === end.x && node.position.y === end.y
  )
  const result: Position[] = []
  while (destination && destination.cost > 0) {
    result.unshift(destination.position)
    destination = destination.via
  }
  return result
}

type ProperNode = {
  char: string
  edges: string[]
  cost?: number
  via?: string
}

type ProperGraph = {
  [key: string]: ProperNode
}

export function parseReverseGraph(str: string): ProperGraph {
  str = str.replace(/S/g, 'a').replace(/E/g, 'z')

  const lines = str.split('\n')
  const width = lines[0].length
  const height = lines.length

  const graph: ProperGraph = {}

  const canGoRev = (from: string, to: string) => canGo(to, from)

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = lines[y][x]

      const serialize = (x: number, y: number) => `${x}:${y}`

      const key = serialize(x, y)
      const edges: string[] = []

      if (y > 0 && canGoRev(char, lines[y - 1][x])) {
        edges.push(serialize(x, y - 1))
      }
      if (y < height - 1 && canGoRev(char, lines[y + 1][x])) {
        edges.push(serialize(x, y + 1))
      }
      if (x > 0 && canGoRev(char, lines[y][x - 1])) {
        edges.push(serialize(x - 1, y))
      }
      if (x < width - 1 && canGoRev(char, lines[y][x + 1])) {
        edges.push(serialize(x + 1, y))
      }

      graph[key] = {
        char,
        edges,
        cost: Infinity,
      }
    }
  }
  return graph
}

export function getShortestPathFromTop(
  graph: ProperGraph,
  end: Position
): Position[] {
  graph = cloneDeep(graph) //

  const unvisited = Object.keys(graph)
  let minCost = Infinity
  let minCostKey = ''

  graph[`${end.x}:${end.y}`].cost = 0

  while (unvisited.length) {
    unvisited.sort((a, b) => graph[b].cost - graph[a].cost)
    const current = unvisited.pop()

    // exit loop if no shorter trails possible
    if (graph[current].cost >= minCost) break

    if (graph[current].cost === Infinity) {
      throw new Error(`Path not found, unvisited: ${unvisited.length}`)
    }

    const nextCost = graph[current].cost + 1
    for (let edge of graph[current].edges) {
      if (nextCost < graph[edge].cost) {
        graph[edge].cost = nextCost
        graph[edge].via = current
      }
    }
    // check if we on the lowest height
    if (graph[current].char === 'a') {
      minCost = Math.min(minCost, graph[current].cost)
      minCostKey = current
    }
  }

  let destination = minCostKey

  const result: Position[] = []
  while (graph[destination].cost > 0) {
    const [x, y] = destination.split(':').map(Number)
    result.unshift({ x, y })
    destination = graph[destination].via
  }
  return result
}

const graph = parseGraph(input)
const { start, end } = parseStartEnd(input)
console.log(getShortestPath(graph, start, end).length)

const graph2 = parseReverseGraph(input)
const { end: end2 } = parseStartEnd(input)
console.log(getShortestPathFromTop(graph2, end2).length)
