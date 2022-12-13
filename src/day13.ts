import * as fs from 'fs'
import { isEqual } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day13.input.txt', 'utf8')
  .replace(/\r/g, '')

type Data = number | Data[]

type Pair = {
  left: Data
  right: Data
}

export function parsePackets(str: string): Pair[] {
  return str.split('\n\n').map(pair => {
    const pairArr = pair.split('\n').map(data => JSON.parse(data))
    return {
      left: pairArr[0],
      right: pairArr[1],
    }
  })
}

export function compareData(left: Data, right: Data): -1 | 0 | 1 {
  //
  // left < right    = -1  -> right order
  // left < right    =  1  -> wrong order
  // left === right  =  0
  //

  if (Array.isArray(left) && Array.isArray(right)) {
    // arrays
    const maxLen = Math.max(left.length, right.length)
    for (let i = 0; i < maxLen; i++) {
      if (left[i] === undefined) return -1
      if (right[i] === undefined) return 1

      const compare = compareData(left[i], right[i])
      if (compare) return compare
    }
    return 0
  } else if (!Array.isArray(left) && !Array.isArray(right)) {
    //numbers
    return Math.sign(left - right) as -1 | 0 | 1
  } else {
    // mixed
    if (Array.isArray(left)) {
      return compareData(left, [right])
    }
    return compareData([left], right)
  }
}

export function getIndicesOfCorrectOnes(packets: Pair[]): number[] {
  return packets
    .map(pair => compareData(pair.left, pair.right))
    .reduce((acc, cur, i) => {
      if (cur === 1) {
        return acc
      }
      return [...acc, i + 1]
    }, [])
}

export function flatPackets(pairs: Pair[]): Data[] {
  return pairs.flatMap(Object.values)
}

export function getDecoderKey(packets: Data[], dividers: Data[]): number {
  const sorted = [...packets, ...dividers].sort(compareData)
  const divIndices = dividers.map(d => sorted.findIndex(v => isEqual(d, v)) + 1)
  return divIndices.reduce((a, b) => a * b)
}

console.log(
  getIndicesOfCorrectOnes(parsePackets(input)).reduce((a, b) => a + b)
)
console.log(getDecoderKey(flatPackets(parsePackets(input)), [[[2]], [[6]]]))
