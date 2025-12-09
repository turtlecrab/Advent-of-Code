import { PriorityQueue } from 'datastructures-js'
import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day08.input.txt', 'utf8')
  .replace(/\r/g, '')

type Vec3 = {
  x: number
  y: number
  z: number
}

const distanceBetween = (a: Vec3, b: Vec3) =>
  Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2)

export function parse(input: string): Vec3[] {
  return input.split('\n').map(line => {
    const [x, y, z] = line.split(',').map(Number)
    return { x, y, z }
  })
}

export function getSortedPairs(points: Vec3[]) {
  const result = new PriorityQueue<[Vec3, Vec3]>(
    (a, b) => distanceBetween(a[0], a[1]) - distanceBetween(b[0], b[1])
  )

  for (let i = 0; i < points.length - 1; i++) {
    for (let j = i + 1; j < points.length; j++) {
      result.push([points[i], points[j]])
    }
  }
  return [points, result] as const
}

export function getCircuitMul(
  points: Vec3[],
  pairs: PriorityQueue<[Vec3, Vec3]>,
  rounds: number
) {
  const circuitIds = new Map<number, Set<[Vec3, Vec3]>>()
  const pointToCircuit = new Map<Vec3, number>()

  for (let i = 0; i < rounds; i++) {
    const pair = pairs.pop()
    const [a, b] = pair

    if (pointToCircuit.has(a) && pointToCircuit.has(b)) {
      const circuitA = pointToCircuit.get(a)
      const circuitB = pointToCircuit.get(b)

      if (circuitA !== circuitB) {
        const pairsInB = circuitIds.get(circuitB)
        pairsInB.forEach(p => circuitIds.get(circuitA).add(p))
        circuitIds.delete(circuitB)
        pairsInB.forEach(pair => {
          pointToCircuit.set(pair[0], circuitA)
          pointToCircuit.set(pair[1], circuitA)
        })
      }
    } else if (pointToCircuit.has(a) || pointToCircuit.has(b)) {
      const circuit = pointToCircuit.get(a) ?? pointToCircuit.get(b)

      pointToCircuit.set(a, circuit)
      pointToCircuit.set(b, circuit)

      circuitIds.get(circuit).add(pair)
    } else {
      const circuit = i

      pointToCircuit.set(a, circuit)
      pointToCircuit.set(b, circuit)

      circuitIds.set(circuit, new Set([pair]))
    }
  }

  const circuitJunctions = circuitIds
    .values()
    .map(v => new Set(v.values().flatMap(v => v)))
    .toArray()

  return circuitJunctions
    .map(set => set.size)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b)
}

console.time('p1')
console.log(getCircuitMul(...getSortedPairs(parse(input)), 1000))
console.timeEnd('p1')
