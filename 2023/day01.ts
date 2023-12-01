import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day01.input.txt', 'utf8')
  .replace(/\r/g, '')

const words = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
}

export function getFirstDigit(str: string): number {
  for (let char of str) {
    if (/\d/.test(char)) return Number(char)
  }
  return NaN
}

export function getParsedFirstDigit(str: string): number {
  while (str.length) {
    if (/\d/.test(str[0])) {
      return Number(str[0])
    }
    for (let word of Object.keys(words)) {
      if (str.startsWith(word)) {
        return words[word]
      }
    }
    str = str.slice(1)
  }
  return NaN
}

export function getParsedLastDigit(str: string): number {
  while (str.length) {
    if (/\d/.test(str.at(-1))) {
      return Number(str.at(-1))
    }
    for (let word of Object.keys(words)) {
      if (str.endsWith(word)) {
        return words[word]
      }
    }
    str = str.slice(0, str.length - 1)
  }
  return NaN
}

export function getCalibrationValue(str: string): number {
  const first = getFirstDigit(str)
  const last = getFirstDigit(str.split('').reverse().join(''))

  return first * 10 + last
}

export function getParsedCalibrationValue(str: string): number {
  const first = getParsedFirstDigit(str)
  const last = getParsedLastDigit(str)

  return first * 10 + last
}

console.log(
  input.split('\n').reduce((acc, cur) => acc + getCalibrationValue(cur), 0)
)

console.log(
  input
    .split('\n')
    .reduce((acc, cur) => acc + getParsedCalibrationValue(cur), 0)
)
