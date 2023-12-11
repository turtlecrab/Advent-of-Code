import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day11.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

type ExpansionData = {
  rows: number[]
  cols: number[]
  factor: number
}

export function parseMap(input: string) {
  return input.split('\n').map(line => [...line])
}

export function getExpansionData(
  map: string[][],
  factor: number
): ExpansionData {
  const data: ExpansionData = {
    rows: [],
    cols: [],
    factor,
  }
  // rows
  for (let i = 0; i < map.length; i++) {
    if (map[i].every(char => char === '.')) {
      data.rows.push(i)
    }
  }
  // cols
  for (let i = 0; i < map[0].length; i++) {
    const col = Array(map.length)
      .fill(null)
      .map((_, j) => map[j][i])
    if (col.every(char => char === '.')) {
      data.cols.push(i)
    }
  }
  return data
}

export function findStars(map: string[][]): Position[] {
  const stars: Position[] = []
  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === '#') {
        stars.push({ x, y })
      }
    }
  }
  return stars
}

export function getLength(
  a: Position,
  b: Position,
  data: ExpansionData
): number {
  // width
  const [left, right] = [a.x, b.x].sort((a, b) => a - b)
  let addedWidth = 0
  for (let col of data.cols) {
    if (col >= left && col <= right) {
      addedWidth += data.factor - 1
    }
  }
  // height
  const [top, bottom] = [a.y, b.y].sort((a, b) => a - b)
  let addedHeight = 0
  for (let row of data.rows) {
    if (row >= top && row <= bottom) {
      addedHeight += data.factor - 1
    }
  }
  return right - left + addedWidth + bottom - top + addedHeight
}

export function getSumOfStarLengths(input: string, factor = 2): number {
  const map = parseMap(input)
  const data = getExpansionData(map, factor)
  const stars = findStars(map)

  let sum = 0

  for (let i = 0; i < stars.length - 1; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      sum += getLength(stars[i], stars[j], data)
    }
  }
  return sum
}

console.log(getSumOfStarLengths(input))

console.log(getSumOfStarLengths(input, 1000000))
