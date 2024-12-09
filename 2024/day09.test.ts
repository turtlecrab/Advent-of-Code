const testInput = `2333133121414131402`

import { defrag, EMPTY, getChecksum, parseUint16Array } from './day09'

const stringify = (data: Uint16Array) =>
  Array.from(data).reduce(
    (acc, cur) => acc + (cur === EMPTY ? '.' : String(cur)),
    ''
  )

describe('parseUint16Array', () => {
  it('works for test input', () => {
    expect(stringify(parseUint16Array(testInput))).toBe(
      '00...111...2...333.44.5555.6666.777.888899'
    )
  })
})

describe('defrag', () => {
  it('works for test input', () => {
    expect(stringify(defrag(parseUint16Array(testInput)))).toBe(
      '0099811188827773336446555566..............'
    )
  })
})

describe('getChecksum', () => {
  it('works for test input', () => {
    expect(getChecksum(defrag(parseUint16Array(testInput)))).toBe(1928)
  })
})
