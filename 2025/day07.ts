import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day07.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parse(input: string) {
  let start = { x: -1, y: -1 }

  const rows = input.split('\n').map((line, y) => {
    if (line.includes('S')) {
      const idx = line.indexOf('S')
      start = { x: idx, y }
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

  return { start, rows }
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

export function play({ start, rows }: ReturnType<typeof parse>) {
  let beams = new Set([start.x])

  let totalSplits = 0

  for (let row of rows) {
    const { result, splitCount } = step(beams, row)
    beams = result
    totalSplits += splitCount
  }
  return totalSplits
}

console.time('p1')
console.log(play(parse(input)))
console.timeEnd('p1')
