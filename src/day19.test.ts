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
    // 1 0
    // ...
    // 18 0 ✅
    // 19 1 ✅
    // 20 2 ✅
    // 21 3 ✅
    // 22 5 ❌
    // 23 7
    // 24 9
    const minutes = 22

    console.table(blueprints[0])
    console.log('Minutes:', minutes)
    const result = simulate(blueprints[0], minutes)
    console.table(result.last)
    console.log('Geodes:', result.geos)
    // expect(simulate(blueprints[0], 5)).toBe(0)
    // expect(simulate(blueprints[0], 18)).toBe(0)
    // expect(simulate(blueprints[0], 19).geos).toBe(1)
    // expect(simulate(blueprints[0], 20)).toBe(2)
    // expect(simulate(blueprints[0], 21)).toBe(3)
    // expect(simulate(blueprints[0], 22)).toBe(5) // ❌ gives 4
    // expect(simulate(blueprints[0], 23)).toBe(7) // ❌ gives 5
    // expect(simulate(blueprints[0], 24)).toBe(9) // ❌ gives 7
  })
  // it('works for #1', () => {
  //   expect(simulate(blueprints[0], 24)).toBe(9)
  // })
  // it('works for #2', () => {
  //   console.table(blueprints[1])
  //   const result = simulate(blueprints[1], 16)
  //   console.table(result.last)
  //   console.log('Geodes:', result.geos)
  //   expect(result.geos).toBe(0)
  //   // expect(simulate(blueprints[1], 24)).toBe(12)
  // })
})
