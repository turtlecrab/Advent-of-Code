import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day07.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parse(input: string) {
  let start = -1

  const rows = input.split('\n').map(line => {
    if (line.includes('S')) {
      const idx = line.indexOf('S')
      start = idx
      line = line.replace('S', '.')
    }
    const set = new Set<number>()

    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (char === '^') {
        set.add(i)
      }
    }
    return set
  })

  return [start, rows] as const
}

export function step(state: Set<number>, splitters: Set<number>) {
  const result = new Set<number>()
  let splitCount = 0

  for (let cur of state) {
    if (splitters.has(cur)) {
      result.add(cur - 1)
      result.add(cur + 1)
      splitCount += 1
    } else {
      result.add(cur)
    }
  }
  return { result, splitCount }
}

export function play(start: number, rows: Set<number>[]) {
  let beams = new Set([start])

  let totalSplits = 0

  for (let row of rows) {
    const { result, splitCount } = step(beams, row)
    beams = result
    totalSplits += splitCount
  }
  return totalSplits
}

export function quantumStep(state: number, splitters: Set<number>) {
  if (splitters.has(state)) {
    return [state - 1, state + 1]
  }
  return [state]
}

const getKey = (state: number, rows: Set<number>[]) =>
  `${state}_${rows
    .map(row => row.keys().reduce((a, b) => `${a},${b}`, ''))
    .join('/')}`

export function quantumPlay(
  state: number,
  rows: Set<number>[],
  cache = new Map<string, number>()
) {
  if (rows.length === 0) return 1

  const key = getKey(state, rows)

  if (cache.has(key)) {
    return cache.get(key)
  }

  const row = rows[0]
  const nextStates = quantumStep(state, row)
  const nextRows = rows.slice(1)

  const result = nextStates
    .map(state => quantumPlay(state, nextRows, cache))
    .reduce((a, b) => a + b)

  cache.set(key, result)

  return result
}

console.time('p1')
console.log(play(...parse(input)))
console.timeEnd('p1')

console.time('p2')
console.log(quantumPlay(...parse(input)))
console.timeEnd('p2')
