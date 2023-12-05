import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day05.input.txt', 'utf8')
  .replace(/\r/g, '')

type Map = {
  source: number
  destination: number
  range: number
}

export function parseMap(s: string) {
  const [destination, source, range] = s.split(' ').map(Number)
  return { source, destination, range }
}

export function parseAll(str: string): { seeds: number[]; maps: Map[][] } {
  const [seeds, ...mapList] = str.split('\n\n')

  return {
    seeds: seeds.split(':')[1].trim().split(/\s+/).map(Number),
    maps: mapList.map(maps => maps.split('\n').slice(1).map(parseMap)),
  }
}

export function transform(pos: number, map: Map): number {
  if (pos >= map.source && pos < map.source + map.range) {
    return pos + map.destination - map.source
  }
  return pos
}

export function getLocation(seed: number, maps: Map[][]): number {
  return maps.reduce((seed, curMaps) => {
    for (let map of curMaps) {
      const next = transform(seed, map)
      if (next !== seed) {
        return next
      }
    }
    return seed
  }, seed)
}

export function getLocations(seeds: number[], maps: Map[][]): number[] {
  return seeds.map(seed => getLocation(seed, maps))
}

type Range = [number, number]

export function seedRangesFromRawData(seedsData: number[]): Range[] {
  return seedsData.reduce((acc, cur, i) => {
    if (i % 2 === 0) {
      acc.push([cur])
    } else {
      acc[(i - 1) / 2].push(cur)
    }
    return acc
  }, [])
}

export function reverseMaps(maps: Map[]): Map[] {
  return maps.map(map => ({
    source: map.destination,
    destination: map.source,
    range: map.range,
  }))
}

export function isInRange(num: number, range: Range): boolean {
  return num >= range[0] && num < range[0] + range[1]
}

// bruteforce version ~43sec TODO
export function getMinLocationOfRanges(seeds: Range[], maps: Map[][]) {
  const reversedMaps = [...maps].reverse().map(maps => reverseMaps(maps))

  for (let location = 0; ; location++) {
    const seed = getLocation(location, reversedMaps)

    for (let range of seeds) {
      if (isInRange(seed, range)) {
        return location
      }
    }
  }
}

const { seeds, maps } = parseAll(input)

console.log(Math.min(...getLocations(seeds, maps)))

console.log(getMinLocationOfRanges(seedRangesFromRawData(seeds), maps))
