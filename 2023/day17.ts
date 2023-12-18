import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day17.input.txt', 'utf8')
  .replace(/\r/g, '')

type Position = {
  x: number
  y: number
}

enum Dir {
  Up,
  Right,
  Down,
  Left,
}

type State = {
  pos: Position
  dir: Dir
  heat: number
  straight: number
  via?: State
}

export function parseMap(input: string) {
  return input.split('\n').map(row => row.split('').map(Number))
}

const sum = (a: Position, b: Position): Position => ({
  x: a.x + b.x,
  y: a.y + b.y,
})

const dirToVec = (dir: Dir): Position =>
  [
    { x: 0, y: -1 },
    { x: 1, y: 0 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
  ][dir]

function step(pos: Position, dir: Dir, map: number[][]): Position | null {
  const next = sum(pos, dirToVec(dir))
  if (
    next.x < 0 ||
    next.x >= map[0].length ||
    next.y < 0 ||
    next.y >= map.length
  )
    return null
  return next
}

export function reverseBFS(map: number[][]): number[][] {
  const width = map[0].length
  const height = map.length

  const result = map.map(row => row.map(() => Infinity))

  const q = [{ dist: 0, pos: { x: width - 1, y: height - 1 } }]

  const visited = new Set<string>()
  const key = (pos: Position) => `${pos.y}:${pos.x}`

  while (q.length) {
    q.sort(
      (a, b) =>
        b.dist + map[b.pos.y][b.pos.x] - (a.dist + map[a.pos.y][a.pos.x])
    )
    const cur = q.pop()

    if (visited.has(key(cur.pos))) continue

    result[cur.pos.y][cur.pos.x] = cur.dist + map[cur.pos.y][cur.pos.x]
    visited.add(key(cur.pos))

    for (let dir of [Dir.Up, Dir.Right, Dir.Down, Dir.Left]) {
      const nextPos = step(cur.pos, dir, map)
      if (!nextPos) continue
      if (visited.has(key(nextPos))) continue

      q.push({ dist: result[cur.pos.y][cur.pos.x], pos: nextPos })
    }
  }
  return result
}

export function play(map: number[][]) {
  const end = { x: map[0].length - 1, y: map.length - 1 }

  const states: State[] = [
    {
      dir: Dir.Right,
      pos: { x: 1, y: 0 },
      straight: 1,
      heat: map[0][1],
    },
    {
      dir: Dir.Down,
      pos: { x: 0, y: 1 },
      straight: 1,
      heat: map[1][0],
    },
  ]

  const heur = reverseBFS(map)

  const visited = new Map<string, number>()

  const key = (pos: Position, dir: Dir, straight: number) =>
    `${pos.y}:${pos.x};${dir};${straight}`

  while (states.length) {
    // states.sort(
    //   (a, b) => b.heat + heur[b.pos.y][b.pos.x] - a.heat - heur[a.pos.y][a.pos.x]
    // )
    // const state = states.pop()

    const minIndex = states.reduce((acc, cur, i) => {
      if (
        cur.heat + heur[cur.pos.y][cur.pos.x] <= // why not "<"? TODO
        states[acc].heat + heur[states[acc].pos.y][states[acc].pos.x]
      )
        return i
      return acc
    }, 0)
    const [state] = states.splice(minIndex, 1)

    if (state.pos.x === end.x && state.pos.y === end.y) {
      return state
    }

    visited.set(key(state.pos, state.dir, state.straight), state.heat)

    const nextDirs: Dir[] = [(state.dir + 1) % 4, (state.dir + 3) % 4]

    if (state.straight < 3) nextDirs.push(state.dir)

    for (let nextDir of nextDirs) {
      const nextPos = step(state.pos, nextDir, map)
      if (!nextPos) continue

      const nextStraight = nextDir === state.dir ? state.straight + 1 : 1
      const nextHeat = state.heat + map[nextPos.y][nextPos.x]
      const nextKey = key(nextPos, nextDir, nextStraight)

      if (visited.has(nextKey) && visited.get(nextKey) <= nextHeat) {
        continue
      }

      states.push({
        pos: nextPos,
        dir: nextDir,
        heat: nextHeat,
        straight: nextStraight,
        // via: state,
      })
    }
  }
  throw new Error("shouldn't go here")
}

console.log(play(parseMap(input)).heat)
