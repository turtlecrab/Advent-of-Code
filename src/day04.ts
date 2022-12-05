import fs from 'fs'
import { test } from './utils'

const input: string = fs.readFileSync('./day04.input.txt', 'utf8')

function isContaining(str: string): boolean {
  const [[a1, a2], [b1, b2]] = str
    .split(',')
    .map(range => range.split('-').map(Number))

  return (a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)
}
// test(isContaining('2-4,6-8'), false)
// test(isContaining('2-3,4-5'), false)
// test(isContaining('5-7,7-9'), false)
// test(isContaining('2-8,3-7'), true)
// test(isContaining('6-6,4-6'), true)
// test(isContaining('2-6,4-8'), false)

const answer1 = input.split('\n').filter(isContaining).length
console.log(answer1)

function isOverlapping(str: string): boolean {
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
// test(isOverlapping('2-4,6-8'), false)
// test(isOverlapping('2-3,4-5'), false)
// test(isOverlapping('5-7,7-9'), true)
// test(isOverlapping('2-8,3-7'), true)
// test(isOverlapping('6-6,4-6'), true)
// test(isOverlapping('2-6,4-8'), true)

const answer2 = input.split('\n').filter(isOverlapping).length
console.log(answer2)
