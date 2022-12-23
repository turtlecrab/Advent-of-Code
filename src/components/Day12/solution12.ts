// import * as fs from 'fs'
import { cloneDeep } from 'lodash'

// const input = fs
//   .readFileSync(__dirname + '/day12.input.txt', 'utf8')
//   .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

type Node = {
  char: string
  edges: string[]
  cost?: number
  via?: string
}

export type Graph = {
  [key: string]: Node
}

export function canGo(from: string, to: string): boolean {
  return to.charCodeAt(0) - from.charCodeAt(0) <= 1
}

export function parseStartEnd(str: string): { start: Position; end: Position } {
  let start: Position = { x: 0, y: 0 }
  let end: Position = { x: 0, y: 0 }

  const lines = str.split('\n')
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[0].length; x++) {
      if (lines[y][x] === 'S') start = { x, y }
      if (lines[y][x] === 'E') end = { x, y }
    }
  }
  return { start, end }
}

export function parseGraph(
  str: string,
  canGoFunc: (from: string, to: string) => boolean = canGo
): Graph {
  str = str.replace(/S/g, 'a').replace(/E/g, 'z')

  const lines = str.split('\n')
  const width = lines[0].length
  const height = lines.length

  const graph: Graph = {}

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const char = lines[y][x]

      const serialize = (x: number, y: number) => `${x}:${y}`

      const key = serialize(x, y)
      const edges: string[] = []

      if (y > 0 && canGoFunc(char, lines[y - 1][x])) {
        edges.push(serialize(x, y - 1))
      }
      if (y < height - 1 && canGoFunc(char, lines[y + 1][x])) {
        edges.push(serialize(x, y + 1))
      }
      if (x > 0 && canGoFunc(char, lines[y][x - 1])) {
        edges.push(serialize(x - 1, y))
      }
      if (x < width - 1 && canGoFunc(char, lines[y][x + 1])) {
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

export function getShortestPath(
  graph: Graph,
  start: Position,
  end: Position
): { result: string[]; visited: string[] } {
  graph = cloneDeep(graph)

  const unvisited = Object.keys(graph)

  graph[`${start.x}:${start.y}`].cost = 0

  let destination: string

  const visited: string[] = []

  while (unvisited.length) {
    unvisited.sort((a, b) => graph[b].cost! - graph[a].cost!)
    const current = unvisited.pop()!

    if (graph[current].cost === Infinity) {
      throw new Error(`Path not found, unvisited: ${unvisited.length}`)
    }

    const nextCost = graph[current].cost! + 1
    for (let edge of graph[current].edges) {
      if (nextCost < graph[edge].cost!) {
        graph[edge].cost = nextCost
        graph[edge].via = current
      }
    }
    // push to visited - visualization only
    visited.push(current)
    // check if destination node is visited
    if (current === `${end.x}:${end.y}`) {
      destination = current
      break
    }
  }

  const result: string[] = []
  while (destination! && graph[destination].cost! > 0) {
    result.unshift(destination)
    destination = graph[destination].via!
  }
  return { result, visited }
}

export function getShortestPathFromTop(
  graph: Graph,
  end: Position
): Position[] {
  graph = cloneDeep(graph)

  const unvisited = Object.keys(graph)
  let minCost = Infinity
  let minCostKey = ''

  graph[`${end.x}:${end.y}`].cost = 0

  while (unvisited.length) {
    unvisited.sort((a, b) => graph[b].cost! - graph[a].cost!)
    const current = unvisited.pop()!

    // exit loop if no shorter trails possible
    if (graph[current].cost! >= minCost) break

    if (graph[current].cost === Infinity) {
      throw new Error(`Path not found, unvisited: ${unvisited.length}`)
    }

    const nextCost = graph[current].cost! + 1
    for (let edge of graph[current].edges) {
      if (nextCost < graph[edge].cost!) {
        graph[edge].cost = nextCost
        graph[edge].via = current
      }
    }
    // check if we on the lowest height
    if (graph[current].char === 'a') {
      minCost = Math.min(minCost, graph[current].cost!)
      minCostKey = current
    }
  }

  let destination = minCostKey

  const result: Position[] = []
  while (graph[destination].cost! > 0) {
    const [x, y] = destination.split(':').map(Number)
    result.unshift({ x, y })
    destination = graph[destination].via!
  }
  return result
}

// const graph = parseGraph(input, canGo)
// const { start, end } = parseStartEnd(input)
// console.log(getShortestPath(graph, start, end).length)

// const graph2 = parseGraph(input, (from, to) => canGo(to, from))
// const { end: end2 } = parseStartEnd(input)
// console.log(getShortestPathFromTop(graph2, end2).length)
