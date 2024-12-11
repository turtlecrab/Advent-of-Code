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

export function getStonesCount(stones: number[], blinks: number): number {
  return blink(stones, blinks).length
}

console.log(getStonesCount(parseStones(input), 25))
