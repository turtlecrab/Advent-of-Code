import * as fs from 'fs'

const input = fs.readFileSync(__dirname + '/day04.input.txt', 'utf8')

export function isContaining(str: string): boolean {
  const [[a1, a2], [b1, b2]] = str
    .split(',')
    .map(range => range.split('-').map(Number))

  return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)
}

export function isOverlapping(str: string): boolean {
  const [[a1, a2], [b1, b2]] = str
    .split(',')
    .map(range => range.split('-').map(Number))

  return (
    (a1 >= b1 && a1 <= b2) ||
    (a2 >= b1 && a2 <= b2) ||
    (b1 >= a1 && b1 <= a2) ||
    (b2 >= a1 && b2 <= a2)
  )
}

const answer1 = input.split('\n').filter(isContaining).length
console.log(answer1)

const answer2 = input.split('\n').filter(isOverlapping).length
console.log(answer2)
