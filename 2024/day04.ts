import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day04.input.txt', 'utf8')
  .replace(/\r/g, '')

type Grid = string[][]

export function parseGrid(input: string): Grid {
  return input.split('\n').map(s => [...s])
}

export function mirrorGridHorizontally(grid: Grid): Grid {
  return grid.map(row => row.toReversed())
}

export function mirrorGridDiagonally(grid: Grid): Grid {
  const result: Grid = []

  for (let row = 0; row < grid.length; row++) {
    result.push([])
    for (let col = 0; col < grid[0].length; col++) {
      result[row].push(grid[col][row])
    }
  }
  return result
}

export function getWordCountInLine(word: string, line: string): number {
  let count = 0
  for (let i = 0; i < line.length - word.length + 1; i++) {
    const slice = line.slice(i, i + word.length)
    const sliceReversed = [...slice].reverse().join('')

    if (slice === word || sliceReversed === word) count += 1
  }
  return count
}

export function getXmasCount(grid: Grid) {
  let count = 0
  const word = 'XMAS'

  for (let row of grid) {
    count += getWordCountInLine(word, row.join(''))
  }

  for (let row of mirrorGridDiagonally(grid)) {
    count += getWordCountInLine(word, row.join(''))
  }

  const mirroredGrid = mirrorGridHorizontally(grid)

  for (let row = 0; row < grid.length - word.length + 1; row++) {
    for (let col = 0; col < grid[0].length - word.length + 1; col++) {
      let diagLine = ''
      let diagMirroredLine = ''

      for (let i = 0; i < word.length; i++) {
        diagLine += grid[row + i][col + i]
        diagMirroredLine += mirroredGrid[row + i][col + i]
      }

      count += getWordCountInLine(word, diagLine)
      count += getWordCountInLine(word, diagMirroredLine)
    }
  }

  return count
}

export function getCrossedMasCount(grid: Grid): number {
  let count = 0
  const word = 'MAS'

  for (let row = 0; row < grid.length - word.length + 1; row++) {
    for (let col = 0; col < grid[0].length - word.length + 1; col++) {
      let wordFromTopLeft = ''
      let wordFromBottomLeft = ''

      for (let i = 0; i < word.length; i++) {
        wordFromTopLeft += grid[row + i][col + i]
        wordFromBottomLeft += grid[row + word.length - i - 1][col + i]
      }

      const reversedWord = [...word].reverse().join('')

      if (
        (wordFromTopLeft === word || wordFromTopLeft === reversedWord) &&
        (wordFromBottomLeft === word || wordFromBottomLeft === reversedWord)
      ) {
        count += 1
      }
    }
  }
  return count
}

console.log(getXmasCount(parseGrid(input)))
console.log(getCrossedMasCount(parseGrid(input)))
