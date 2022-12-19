import * as fs from 'fs'
import { Z_FULL_FLUSH } from 'zlib'

const input = fs
  .readFileSync(__dirname + '/day19.input.txt', 'utf8')
  .replace(/\r/g, '')

type Res = [number, number, number, number]

type RobotBlueprint = {
  ore: Res
  clay: Res
  obsidian: Res
  geode: Res
}

type State = {
  resources: Res
  harvesters: Res
}

export function parseBlueprints(str: string): RobotBlueprint[] {
  return str.split('\n').map(line => {
    const ore = line.match(/Each ore robot costs (\d+) ore./)[1]
    const clay = line.match(/Each clay robot costs (\d+) ore./)[1]
    const [, obs1, obs2] = line.match(
      /Each obsidian robot costs (\d+) ore and (\d+) clay./
    )
    const [, geo1, geo2] = line.match(
      /Each geode robot costs (\d+) ore and (\d+) obsidian./
    )
    return {
      ore: [Number(ore), 0, 0, 0],
      clay: [Number(clay), 0, 0, 0],
      obsidian: [Number(obs1), Number(obs2), 0, 0],
      geode: [Number(geo1), 0, Number(geo2), 0],
    }
  })
}

const sumRes = (a: Res, b: Res): Res => a.map((r, i) => r + b[i]) as Res
const subtractRes = (a: Res, b: Res): Res => a.map((r, i) => r - b[i]) as Res
const multRes = (a: Res, factor: number): Res => a.map(r => r * factor) as Res
const canAfford = (money: Res, price: Res): boolean =>
  subtractRes(money, price).every(r => r >= 0)

export function simulate(blueprint: RobotBlueprint, minutes: number): number {
  const state: State = {
    resources: [0, 0, 0, 0],
    harvesters: [1, 0, 0, 0],
  }

  const geodeFullPrice: Res = sumRes(
    [blueprint.geode[0], 0, 0, 0],
    multRes(blueprint.obsidian, blueprint.geode[0])
  )
  console.log('fullPrice', geodeFullPrice)
  const ratioForObsidian = geodeFullPrice[1] / geodeFullPrice[0]

  for (let i = 0; i < minutes; i++) {
    // decide how to spend money
    // console.log()
    console.log(`${i + 1}:`, state.resources, state.harvesters)

    let newHarvester: Res = [0, 0, 0, 0]
    if (canAfford(state.resources, blueprint.geode)) {
      state.resources = subtractRes(state.resources, blueprint.geode)
      newHarvester = [0, 0, 0, 1]
      console.log('Bought geode')
    } else if (canAfford(state.resources, blueprint.obsidian)) {
      state.resources = subtractRes(state.resources, blueprint.obsidian)
      newHarvester = [0, 0, 1, 0]
      console.log('Bought obsidian')
    } else if (
      canAfford(state.resources, blueprint.clay) &&
      state.resources[1] / state.resources[0] < ratioForObsidian
    ) {
      console.log('Bought clay')

      state.resources = subtractRes(state.resources, blueprint.clay)
      newHarvester = [0, 1, 0, 0]
    } else if (canAfford(state.resources, blueprint.ore)) {
      console.log('Bought ore')

      state.resources = subtractRes(state.resources, blueprint.ore)
      newHarvester = [1, 0, 0, 0]
    }

    // harvest
    state.resources = sumRes(state.resources, state.harvesters)

    // add new harvester if we bought one
    state.harvesters = sumRes(state.harvesters, newHarvester)
    // console.log('new:', newHarvester)
    // console.table(state)
  }
  console.log('blueprint:', blueprint)
  return state.resources[3]
}
