import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day11.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseStones(input: string): number[] {
  return input.split(' ').map(Number)
}

export function blink(stones: number[], blinks = 1): number[] {
  let next = stones

  for (let i = 0; i < blinks; i++) {
    stones = next
    next = []

    for (let stone of stones) {
      const stoneStr = String(stone)

      if (stone === 0) {
        next.push(1)
      } else if (stoneStr.length % 2 === 0) {
        next.push(
          Number(stoneStr.slice(0, stoneStr.length / 2)),
          Number(stoneStr.slice(stoneStr.length / 2))
        )
      } else {
        next.push(stone * 2024)
      }
    }
  }
  return next
}

export function getStoneSizeAfterBlinks(
  stone: number,
  blinks: number,
  cache = new Map<string, number>()
): number {
  if (blinks <= 0) return 1

  const key = `${stone}:${blinks}`

  if (cache.has(key)) return cache.get(key)

  const result = blink([stone])
    .map(s => getStoneSizeAfterBlinks(s, blinks - 1, cache))
    .reduce((a, b) => a + b)

  cache.set(key, result)
  return result
}

export function getStonesCount(stones: number[], blinks: number): number {
  const cache = new Map<string, number>()
  return stones
    .map(stone => getStoneSizeAfterBlinks(stone, blinks, cache))
    .reduce((a, b) => a + b)
}

console.log(getStonesCount(parseStones(input), 25))
console.log(getStonesCount(parseStones(input), 75))
