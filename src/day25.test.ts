import { decToSnafu, getSnafuSum, snafuToDec } from './day25'

const testInput = `1=-0-2
12111
2=0=
21
2=01
111
20012
112
1=-1=
1-12
12
1=
122`

describe('snafuToDec', () => {
  it('converts snafu to decimal', () => {
    expect(snafuToDec('1=-0-2')).toBe(1747)
    expect(snafuToDec('12111')).toBe(906)
    expect(snafuToDec('2=0=')).toBe(198)
    expect(snafuToDec('21')).toBe(11)
    expect(snafuToDec('2=01')).toBe(201)
    expect(snafuToDec('111')).toBe(31)
  })
})

describe('getSnafuSum', () => {
  it('gets decimal value', () => {
    expect(getSnafuSum(testInput)).toBe(4890)
  })
})

describe('decToSnafu', () => {
  it('converts decimal to snafu', () => {
    expect(decToSnafu(getSnafuSum(testInput))).toBe('2=-1=0')
  })
})
