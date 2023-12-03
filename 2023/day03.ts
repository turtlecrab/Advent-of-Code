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

type Gears = {
  [key: string]: number[] // "y:x" : [1, 2, ...]
}

export function getAdjacentGears(
  map: Map,
  y: number,
  startX: number,
  endX: number
): string[] {
  const result: string[] = []

  const isGear = (y: number, x: number) => map[y]?.[x] === '*'
  const serialize = (y: number, x: number) => `${y}:${x}`

  for (let x = startX - 1; x <= endX; x++) {
    // above
    if (isGear(y - 1, x)) result.push(serialize(y - 1, x))
    // below
    if (isGear(y + 1, x)) result.push(serialize(y + 1, x))
  }
  // left
  if (isGear(y, startX - 1)) result.push(serialize(y, startX - 1))
  // right
  if (isGear(y, endX)) result.push(serialize(y, endX))

  return result
}

export function getAllGears(map: Map): Gears {
  const result: Gears = {}

  for (let y = 0; y < map.length; y++) {
    let numBuffer = ''

    for (let x = 0; x <= map[y].length; x++) {
      const char = map[y][x]

      if (/\d/.test(char)) {
        numBuffer += char
      } else if (numBuffer.length > 0) {
        const gears = getAdjacentGears(map, y, x - numBuffer.length, x)
        for (let gear of gears) {
          if (gear in result) {
            result[gear].push(Number(numBuffer))
          } else {
            result[gear] = [Number(numBuffer)]
          }
        }
        numBuffer = ''
      }
    }
  }
  return result
}

export function filterProperGears(gears: Gears): Gears {
  return Object.keys(gears)
    .filter(gear => gears[gear].length === 2)
    .reduce((acc, cur) => {
      acc[cur] = gears[cur]
      return acc
    }, {})
}

export function sumOfGearRatios(gears: Gears): number {
  return Object.values(gears)
    .map(([a, b]) => a * b)
    .reduce((a, c) => a + c)
}

console.log(
  getNumbersAdjacentToSymbols(parseMap(input)).reduce((a, c) => a + c)
)

console.log(sumOfGearRatios(filterProperGears(getAllGears(parseMap(input)))))
