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

  const getNode = (pos: Position) =>
    all.find(n => n.position.x === pos.x && n.position.y === pos.y)

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

const graph = parseGraph(input)
const { start, end } = parseStartEnd(input)

console.log(getShortestPath(graph, start, end).length)
