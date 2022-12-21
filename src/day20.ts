import * as fs from 'fs'
import { randomUUID } from 'crypto'
import { cloneDeep } from 'lodash'

const input = fs
  .readFileSync(__dirname + '/day20.input.txt', 'utf8')
  .replace(/\r/g, '')

type Num = {
  order: number
  // id: string
  value: number
}

export function parseNums(str: string): Num[] {
  return str.split('\n').map((value, i) => ({
    order: i,
    // id: randomUUID(),
    value: Number(value),
  }))
}

export function mix(nums: Num[], rounds = 0): Num[] {
  const next = [...nums]
  rounds = rounds || nums.length

  // 1, 2, -3, 3, -2, 0, 4

  for (let i = 0; i < rounds; i++) {
    const current = nums[i]
    // console.log('i:', i, 'cur:', current)
    const move = current.value
    const curPos = next.findIndex(el => el === current)
    let newPos = (curPos + move) % nums.length
    if (newPos === 0) newPos = nums.length - 1
    if (curPos + move > nums.length) newPos += 1

    const el = next.splice(curPos, 1)
    // console.log('after cut:', next)
    next.splice(newPos, 0, ...el)
    // console.log(i, 'after insert:', next)
  }

  return next
}

export function getGroveCoords(nums: Num[]): number {
  const elIndex = nums.findIndex(num => num.value === 0)
  console.log(elIndex)

  console.log(
    nums[(elIndex + 1000) % nums.length].value,
    nums[(elIndex + 2000) % nums.length].value,
    nums[(elIndex + 3000) % nums.length].value
  )

  return (
    nums[(elIndex + 1000) % nums.length].value +
    nums[(elIndex + 2000) % nums.length].value +
    nums[(elIndex + 3000) % nums.length].value
  )
}

console.log(getGroveCoords(mix(parseNums(input))))
