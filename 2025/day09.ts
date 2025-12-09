import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day09.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parse(input: string) {
  return input
    .split('\n')
    .map(line => line.split(',').map(Number) as [number, number])
    .sort((a, b) => a[1] - b[1] || a[0] - b[0])
}

export function findMax(points: [number, number][]) {
  return points.reduce(
    (acc, _, i) => {
      if (i === points.length - 1) return acc

      for (let j = i + 1; j < points.length - 1; j++) {
        const a = points[i]
        const b = points[j]
        const area = (Math.abs(b[0] - a[0]) + 1) * (Math.abs(b[1] - a[1]) + 1)

        if (area > acc.area) {
          acc.area = area
          acc.sides = [a, b]
        }
      }
      return acc
    },
    {
      area: -1,
      sides: [
        [-1, -1],
        [-1, -1],
      ],
    }
  ).area
}

console.time('p1')
console.log(findMax(parse(input)))
console.timeEnd('p1')
