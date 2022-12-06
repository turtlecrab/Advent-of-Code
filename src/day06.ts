import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day06.input.txt', 'utf8')

export function getStartMarkerIndex(
  stream: string,
  markerLength: number
): number {
  let buffer = ''
  for (let i in [...stream]) {
    const char = stream[i]
    buffer = buffer + char
    if (buffer.length > markerLength) {
      buffer = buffer.slice(1)
    }
    if (new Set(buffer).size === markerLength) {
      return Number(i) + 1
    }
  }
  return -1
}

console.log(getStartMarkerIndex(input, 4))
console.log(getStartMarkerIndex(input, 14))
