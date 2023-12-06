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

type DiffMap = {
  from: number
  to: number
  diff: number
}

export function mergeDiff(
  cur: DiffMap,
  map: DiffMap
): {
  isIntersecting: boolean
  processed?: DiffMap[]
  remainder?: DiffMap[]
} {
  // no intersection
  if (map.from >= cur.to + cur.diff || map.to <= cur.from + cur.diff) {
    return { isIntersecting: false }
  }

  // mapping covers cur
  if (map.from <= cur.from + cur.diff && map.to >= cur.to + cur.diff) {
    return {
      isIntersecting: true,
      processed: [
        {
          ...cur,
          diff: cur.diff + map.diff,
        },
      ],
    }
  }

  // left intersection
  if (map.from <= cur.from + cur.diff && map.to < cur.to + cur.diff) {
    return {
      isIntersecting: true,
      processed: [
        {
          from: cur.from,
          to: map.to - cur.diff,
          diff: cur.diff + map.diff,
        },
      ],
      remainder: [
        {
          from: map.to - cur.diff,
          to: cur.to,
          diff: cur.diff,
        },
      ],
    }
  }
  // right intersection
  if (map.from > cur.from + cur.diff && map.to >= cur.to + cur.diff) {
    return {
      isIntersecting: true,
      remainder: [
        {
          from: cur.from,
          to: map.from - cur.diff,
          diff: cur.diff,
        },
      ],
      processed: [
        {
          from: map.from - cur.diff,
          to: cur.to,
          diff: cur.diff + map.diff,
        },
      ],
    }
  }

  // mapping inside cur
  if (map.from > cur.from + cur.diff && map.to < cur.to + cur.diff) {
    return {
      isIntersecting: true,
      processed: [
        {
          from: map.from - cur.diff,
          to: map.to - cur.diff,
          diff: cur.diff + map.diff,
        },
      ],
      remainder: [
        {
          from: cur.from,
          to: map.from - cur.diff,
          diff: cur.diff,
        },
        {
          from: map.to - cur.diff,
          to: cur.to,
          diff: cur.diff,
        },
      ],
    }
  }

  throw new Error("shouldn't go here")
}

export function rangeToDiff(range: Range): DiffMap {
  return {
    from: range[0],
    to: range[0] + range[1],
    diff: 0,
  }
}

export function mapToDiff(map: Map): DiffMap {
  return {
    from: map.source,
    to: map.source + map.range,
    diff: map.destination - map.source,
  }
}

export function merge(diffs: DiffMap[], maps: DiffMap[]): DiffMap[] {
  const next: DiffMap[] = []
  const current = [...diffs]

  while (current.length) {
    const diff = current.pop()
    let didIntersect = false

    for (let map of maps) {
      const { isIntersecting, processed, remainder } = mergeDiff(diff, map)

      if (isIntersecting) {
        next.push(...processed)

        if (remainder) {
          current.push(...remainder)
        }

        didIntersect = true
        break
      }
    }
    if (!didIntersect) next.push(diff)
  }

  return next
}

export function getFinalRanges(seeds: Range[], mapsList: Map[][]) {
  let curDiffs: DiffMap[] = seeds.map(rangeToDiff)
  const diffMapsList = mapsList.map(maps => maps.map(mapToDiff))

  for (let diffMaps of diffMapsList) {
    curDiffs = merge(curDiffs, diffMaps)
  }

  return curDiffs
}

export function getMinLocationOfRanges(
  seeds: Range[],
  mapsList: Map[][]
): number {
  const diffs = getFinalRanges(seeds, mapsList)

  diffs.sort((a, b) => a.from + a.diff - (b.from + b.diff))

  return diffs[0].from + diffs[0].diff
}

const { seeds, maps } = parseAll(input)

console.log(Math.min(...getLocations(seeds, maps)))

console.log(getMinLocationOfRanges(seedRangesFromRawData(seeds), maps))
