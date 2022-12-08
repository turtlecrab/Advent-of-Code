import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day08.input.txt', 'utf8')
  .replace(/\r/g, '')

type Map = number[][]

export function parseMap(str: string): Map {
  return str.split('\n').map(row => row.split('').map(Number))
}

export function isVisible(trees: Map, row: number, col: number): boolean {
  if (
    row === 0 ||
    row === trees.length - 1 ||
    col === 0 ||
    col === trees[0].length - 1
  )
    return true

  const treeHeight = trees[row][col]

  if (
    trees[row].slice(0, col).every(h => h < treeHeight) ||
    trees[row].slice(col + 1).every(h => h < treeHeight) ||
    trees
      .map(r => r[col])
      .slice(0, row)
      .every(h => h < treeHeight) ||
    trees
      .map(r => r[col])
      .slice(row + 1)
      .every(h => h < treeHeight)
  )
    return true

  return false
}

export function getVisibleAmount(trees: Map): number {
  return trees
    .map(
      (row, i) =>
        row.map((_c, j) => isVisible(trees, i, j)).filter(a => a).length
    )
    .reduce((a, c) => a + c)
}

export function getVisibleInLine(
  treesInLine: number[],
  maxHeight: number
): number {
  let visible = 0
  for (let h of treesInLine) {
    visible += 1
    if (h >= maxHeight) break
  }
  return visible
}

export function getScenicScore(trees: Map, row: number, col: number): number {
  // this check can be omitted
  if (
    row === 0 ||
    row === trees.length - 1 ||
    col === 0 ||
    col === trees[0].length - 1
  )
    return 0

  const treeHeight = trees[row][col]

  const left = getVisibleInLine(trees[row].slice(0, col).reverse(), treeHeight)
  const right = getVisibleInLine(trees[row].slice(col + 1), treeHeight)
  const up = getVisibleInLine(
    trees
      .map(r => r[col])
      .slice(0, row)
      .reverse(),
    treeHeight
  )
  const down = getVisibleInLine(
    trees.map(r => r[col]).slice(row + 1),
    treeHeight
  )
  return left * right * up * down
}

export function getHighestScenicScore(trees: Map): number {
  return Math.max(
    ...trees.map((row, i) =>
      Math.max(...row.map((_, j) => getScenicScore(trees, i, j)))
    )
  )
}

console.log(getVisibleAmount(parseMap(input)))
console.log(getHighestScenicScore(parseMap(input)))
