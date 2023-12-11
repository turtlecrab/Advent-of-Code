import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day11.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

export function parseMap(input: string) {
  return input.split('\n').map(line => [...line])
}

export function expand(map: string[][]): string[][] {
  // rows
  for (let i = 0; i < map.length; i++) {
    if (map[i].every(char => char === '.')) {
      map.splice(i, 0, [...map[i]])
      i += 1
    }
  }
  // cols
  for (let i = 0; i < map[0].length; i++) {
    const col = Array(map.length)
      .fill(null)
      .map((_, j) => map[j][i])
    if (col.every(char => char === '.')) {
      for (let row = 0; row < map.length; row++) {
        map[row].splice(i, 0, '.')
      }
      i += 1
    }
  }
  return map
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

export function getLength(a: Position, b: Position): number {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
}

export function getSumOfLengths(stars: Position[]): number {
  let sum = 0
  for (let i = 0; i < stars.length - 1; i++) {
    for (let j = i + 1; j < stars.length; j++) {
      sum += getLength(stars[i], stars[j])
    }
  }
  return sum
}

console.log(getSumOfLengths(findStars(expand(parseMap(input)))))
