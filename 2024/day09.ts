import * as fs from 'fs'

export const input = fs
  .readFileSync(__dirname + '/day09.input.txt', 'utf8')
  .replace(/\r/g, '')

export const EMPTY = 65535

export function parseUint16Array(input: string) {
  let len = 0
  for (let char of input) {
    len += Number(char)
  }
  const data = new Uint16Array(len)

  let isFile = true
  let head = 0
  let id = 0

  for (let char of input) {
    const size = Number(char)

    for (let i = 0; i < size; i++) {
      data[head] = isFile ? id : EMPTY
      head += 1
    }

    if (isFile) id += 1
    isFile = !isFile
  }

  return data
}

export function defrag(data: Uint16Array) {
  let head1 = 0
  let head2 = data.length - 1

  while (true) {
    while (data[head1] !== EMPTY && head1 !== head2) {
      head1 += 1
    }
    while (data[head2] === EMPTY && head1 !== head2) {
      head2 -= 1
    }
    if (head1 === head2) break

    data[head1] = data[head2]
    data[head2] = EMPTY
  }

  return data
}

export function getChecksum(data: Uint16Array): number {
  return data.reduce((acc, cur, i) => acc + (cur === EMPTY ? 0 : cur * i), 0)
}

console.log(getChecksum(defrag(parseUint16Array(input))))
