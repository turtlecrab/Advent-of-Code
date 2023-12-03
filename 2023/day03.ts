import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day03.input.txt', 'utf8')
  .replace(/\r/g, '')

type Map = string[][]

export function parseMap(input: string): Map {
  return input.split('\n').map(line => line.split('').map(char => char))
}

export function isSymbol(map: Map, y: number, x: number): boolean {
  if (y < 0 || y >= map.length) return false
  if (x < 0 || x >= map[0].length) return false
  return map[y][x] !== '.' && !/\d/.test(map[y][x])
}

export function isAdjacentToSymbols(
  map: Map,
  y: number,
  startX: number,
  endX: number
): boolean {
  for (let x = startX - 1; x <= endX; x++) {
    // above
    if (isSymbol(map, y - 1, x)) return true
    // below
    if (isSymbol(map, y + 1, x)) return true
  }
  // left
  if (isSymbol(map, y, startX - 1)) return true
  // right
  if (isSymbol(map, y, endX)) return true

  return false
}

export function getNumbersAdjacentToSymbols(map: Map): number[] {
  return map.flatMap((line, y) => {
    const nums: number[] = []
    let numBuffer = ''

    for (let x = 0; x <= line.length; x++) {
      const char = map[y][x]

      if (/\d/.test(char)) {
        numBuffer += char
      } else if (numBuffer.length > 0) {
        // not a number and has numbers in buffer
        if (isAdjacentToSymbols(map, y, x - numBuffer.length, x)) {
          nums.push(Number(numBuffer))
        }
        numBuffer = ''
      }
    }
    return nums
  })
}

console.log(
  getNumbersAdjacentToSymbols(parseMap(input)).reduce((a, c) => a + c)
)
