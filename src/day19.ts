import * as fs from 'fs'

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
const canAfford = (money: Res, price: Res): boolean =>
  subtractRes(money, price).every(r => r >= 0)

const serialize = (state: State, minutes: number): string =>
  `${minutes}:${String(state.resources)}:${String(state.harvesters)}`

let searched = 0
let skipped = 0
// let lastState

export function simulate(
  blueprint: RobotBlueprint,
  minutes: number,
  state?: State,
  memo: { [key: string]: number } = {}
): number {
  const initialState: State = {
    resources: [0, 0, 0, 0],
    harvesters: [1, 0, 0, 0],
  }
  state = state || initialState

  if (serialize(state, minutes) in memo) {
    skipped += 1
    return memo[serialize(state, minutes)]
  }

  // console.log('min:', minutes, state.resources, state.harvesters)

  if (minutes <= 0) return state.resources[3]

  let branches = []

  // 1. if we can buy geode, we should
  if (canAfford(state.resources, blueprint.geode)) {
    const newState: State = {
      resources: subtractRes(state.resources, blueprint.geode),
      harvesters: sumRes(state.harvesters, [0, 0, 0, 1]),
    }
    // console.log('bought geode')
    // return simulate(blueprint, minutes - 1, newState, memo)
    branches.push(simulate(blueprint, minutes - 1, newState, memo))
  }

  // collect all other branches
  // 1.
  if (canAfford(state.resources, blueprint.obsidian)) {
    const newState: State = {
      resources: sumRes(
        subtractRes(state.resources, blueprint.obsidian),
        state.harvesters
      ),
      harvesters: sumRes(state.harvesters, [0, 0, 1, 0]),
    }
    // console.log('bought obsidian')
    branches.push(simulate(blueprint, minutes - 1, newState, memo))
  }
  // 2.
  if (canAfford(state.resources, blueprint.clay)) {
    const newState: State = {
      resources: sumRes(
        subtractRes(state.resources, blueprint.clay),
        state.harvesters
      ),
      harvesters: sumRes(state.harvesters, [0, 1, 0, 0]),
    }
    // console.log('bought clay')
    branches.push(simulate(blueprint, minutes - 1, newState, memo))
  }
  // 3.
  if (canAfford(state.resources, blueprint.ore)) {
    const newState: State = {
      resources: sumRes(
        subtractRes(state.resources, blueprint.ore),
        state.harvesters
      ),
      harvesters: sumRes(state.harvesters, [1, 0, 0, 0]),
    }
    // console.log('bought ore')
    branches.push(simulate(blueprint, minutes - 1, newState, memo))
  }
  // buy nothing
  // 4.
  const newState: State = {
    resources: sumRes(state.resources, state.harvesters),
    harvesters: state.harvesters,
  }
  branches.push(simulate(blueprint, minutes - 1, newState, memo))

  const result = Math.max(...branches)
  memo[serialize(state, minutes)] = result
  searched += branches.length
  return result
}

// let a = performance.now()

// const testInput = `Blueprint 1: Each ore robot costs 4 ore. Each clay robot costs 2 ore. Each obsidian robot costs 3 ore and 14 clay. Each geode robot costs 2 ore and 7 obsidian.
// Blueprint 2: Each ore robot costs 2 ore. Each clay robot costs 3 ore. Each obsidian robot costs 3 ore and 8 clay. Each geode robot costs 3 ore and 12 obsidian.`

// const blueprints = parseBlueprints(testInput)
// console.table(blueprints[0])
// console.log(simulate(blueprints[0], 24))
// console.log('searched:', searched)
// console.log('skipped:', skipped)
// console.log('searched + skipped:', searched + skipped)

// console.log('time:', performance.now() - a)
