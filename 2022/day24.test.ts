import {
  Blizzards,
  getBlizzardsAt,
  getNext,
  parseBlizzards,
  play,
  Position,
  State,
} from './day24'

const testInput = `#.######
#>>.<^<#
#.<..<<#
#>v.><>#
#<^v^^>#
######.#`

export function printBlizzards(
  blizzards: Blizzards,
  player?: Position
): string {
  let map = blizzards.map(row =>
    row.map(el => (el.length > 1 ? el.length : el.length > 0 ? el[0] : '.'))
  ) as any
  if (player && map[player.y]) map[player.y][player.x] = 'E'
  return map.map(r => r.join('')).join('\n')
}

export function printStateChain(state: State, start: Blizzards): string {
  return (
    `\n\nStep #${state.steps}\n---------\n` +
    printBlizzards(getBlizzardsAt(state.steps, [start]), state.pos) +
    (state.via == null ? '' : printStateChain(state.via, start))
  )
}

describe('parseBlizzards', () => {
  it('parses', () => {
    const blizzards = parseBlizzards(testInput)
    // console.log(printBlizzards(blizzards))
    expect(blizzards.flat()).toHaveLength(24)
    expect(blizzards[2][1]).toEqual(['v'])
  })
})

describe('getNext', () => {
  it('gets next', () => {
    const next = getNext(parseBlizzards(testInput))
    // console.log(printBlizzards(next))
    expect(printBlizzards(next)).toBe('.>3.<.\n<..<<.\n>2.22.\n>v..^<')
  })
})

describe('getBlizzardsAt', () => {
  it('gets it at step 18', () => {
    const next = getBlizzardsAt(18, [parseBlizzards(testInput)])
    expect(printBlizzards(next)).toBe('>2.<.<\n.2v^2<\n>..>2>\n<....>')
  })
})

describe('play', () => {
  it('finds exit', () => {
    const blizzards = parseBlizzards(testInput)
    const endState = play(blizzards)
    // console.log(printStateChain(endState, blizzards))
    expect(endState.steps).toBe(18)
  })
})
