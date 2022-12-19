import { parseBlueprints, simulate } from './day19'

const testInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`

describe('parseBlueprints', () => {
  it('does stuff', () => {
    const blueprints = parseBlueprints(testInput)
    expect(blueprints).toHaveLength(2)
  })
})

describe('simulate', () => {
  const blueprints = parseBlueprints(testInput)
  it('works for #1', () => {
    expect(simulate(blueprints[0], 24)).toBe(9)
  })
  // it('works for #2', () => {
  //   expect(simulate(blueprints[1], 24)).toBe(12)
  // })
})
