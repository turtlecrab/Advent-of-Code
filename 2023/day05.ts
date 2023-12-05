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

const { seeds, maps } = parseAll(input)

console.log(Math.min(...getLocations(seeds, maps)))
