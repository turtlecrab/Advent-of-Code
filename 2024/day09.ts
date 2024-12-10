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

export function getChecksumPart2(input: string) {
  const sizes = [...input].map(Number)
  const startHeads = sizes.map((_, i) =>
    sizes.slice(0, i).reduce((a, b) => a + b, 0)
  )
  const lastFileIdx =
    sizes.length % 2 === 0 ? sizes.length - 2 : sizes.length - 1

  const movedFilesIndices = new Set<number>()
  const movedFilesNewHeads = new Map<number, number>() // new head => idx

  for (let fileIdx = lastFileIdx; fileIdx > 1; fileIdx -= 2) {
    for (let freeIdx = 1; freeIdx < fileIdx; freeIdx += 2) {
      if (sizes[freeIdx] >= sizes[fileIdx]) {
        movedFilesIndices.add(fileIdx)
        movedFilesNewHeads.set(startHeads[freeIdx], fileIdx)

        sizes[freeIdx] = sizes[freeIdx] - sizes[fileIdx]
        startHeads[freeIdx] += sizes[fileIdx]

        break
      }
    }
  }

  let sum = 0

  for (let idx = 0; idx < sizes.length; idx += 2) {
    let head = startHeads[idx]

    if (!movedFilesIndices.has(idx)) {
      for (let i = 0; i < sizes[idx]; i++) {
        sum += head * (idx / 2)
        head += 1
      }
    } else {
      head += sizes[idx]
    }

    while (movedFilesNewHeads.has(head)) {
      const movedIdx = movedFilesNewHeads.get(head)
      for (let i = 0; i < sizes[movedIdx]; i++) {
        sum += head * (movedIdx / 2)
        head += 1
      }
    }
  }

  return sum
}

console.log(getChecksum(defrag(parseUint16Array(input))))
console.log(getChecksumPart2(input))




export function getChecksumPart2___(data: Uint16Array,input: string) {
  const sizes = [...input].map(Number)
  const startHeads = sizes.map((_, i) =>
    sizes.slice(0, i).reduce((a, b) => a + b, 0)
  )

  let lastFileIdx = sizes.length % 2 === 0 ? sizes.length - 2 : sizes.length - 1

  const movedFilesIndices = new Set<number>()
  const movedFilesNewHeads = new Map<number, number>() // new head => idx

  while (true) {
    for (let freeIdx = 1; freeIdx < lastFileIdx; freeIdx += 2) {
      if (sizes[freeIdx] >= sizes[lastFileIdx]) {
        const freeStart = startHeads[freeIdx]
        const fileStart = startHeads[lastFileIdx]

        for (let i = 0; i < sizes[lastFileIdx]; i++) {
          data[freeStart + i] = lastFileIdx / 2
          data[fileStart + i] = EMPTY
        }

        sizes[freeIdx] = sizes[freeIdx] - sizes[lastFileIdx]
        startHeads[freeIdx] += sizes[lastFileIdx]

        // console.log(stringify(data))

        break
      }
    }

  let sum = 0

  for (let idx = 0; idx < sizes.length; idx += 2) {
    let head = startHeads[idx]

    if (!movedFilesIndices.has(idx)) {
      for (let i = 0; i < sizes[idx]; i++) {
        sum += head * (idx / 2)
        head += 1
      }
    } else {
      head += sizes[idx]
    }

    while (movedFilesNewHeads.has(head)) {
      const movedIdx = movedFilesNewHeads.get(head)
      for (let i = 0; i < sizes[movedIdx]; i++) {
        sum += head * (movedIdx / 2)
        head += 1
      }
    }
  }

  return sum
}