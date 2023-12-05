import { getLocations, parseAll, parseMap, transform } from './day05'

const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`

describe('parseAll', () => {
  const { seeds, maps } = parseAll(testInput)

  it('parses seeds', () => {
    expect(seeds).toEqual([79, 14, 55, 13])
  })
  it('parses maps', () => {
    expect(maps[0][0]).toEqual({ destination: 50, source: 98, range: 2 })
    expect(maps[6][1]).toEqual({ destination: 56, source: 93, range: 4 })
  })
})

describe('transform', () => {
  it('transform 1 step', () => {
    expect(transform(79, parseMap('50 98 2'))).toBe(79)
    expect(transform(79, parseMap('52 50 48'))).toBe(81)
  })
})

describe('getLocations', () => {
  const { seeds, maps } = parseAll(testInput)

  it('gets em', () => {
    expect(getLocations(seeds, maps)).toEqual([82, 43, 86, 35])
  })
})
