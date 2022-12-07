import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day07.input.txt', 'utf8')
  .replace(/\r/g, '')

export type File = {
  name: string
  size: number
}

export type Dir = {
  name: string
  children: (Dir | File)[]
}

export function parseInput(str: string): Dir {
  type Path = string[]

  const root: Dir = {
    name: '/',
    children: [],
  }

  const lines = str.split('\n')
  const currentDir: Path = []

  function getDirObject(path: Path): Dir {
    const stack = [...path]
    let curDir = root

    while (stack.length) {
      const nextDir = stack.shift()!
      curDir = curDir.children.find(el => el.name === nextDir) as Dir
    }
    return curDir
  }

  lines.forEach(line => {
    if (/^\$/.test(line)) {
      const command = line.slice(2)

      if (/^cd/.test(command)) {
        const dirName = command.split(' ')[1]

        if (dirName === '..') {
          currentDir.pop()
        } else if (dirName === '/') {
          while (currentDir.length) currentDir.pop()
        } else {
          currentDir.push(dirName)
        }
      }
    } else {
      const dir = getDirObject(currentDir)

      if (/^dir/.test(line)) {
        const name = line.split(' ')[1]
        dir.children.push({
          name,
          children: [],
        })
      } else if (/^\d/.test(line)) {
        const [size, name] = line.split(' ')
        dir.children.push({
          name,
          size: Number(size),
        })
      }
    }
  })

  return root
}

export function getDirSize(dir: Dir): number {
  return dir.children.reduce((acc, el) => {
    if (Object.hasOwn(el, 'size')) {
      return acc + (el as File).size
    }
    return acc + getDirSize(el as Dir)
  }, 0)
}

export function flattenDir(dir: Dir): Dir[] {
  const flatArr: Dir[] = []

  flatArr.push(dir)
  for (let el of dir.children) {
    if (Object.hasOwn(el, 'children')) {
      flatArr.push(...flattenDir(el as Dir))
    }
  }
  return flatArr
}

const result1 = flattenDir(parseInput(input))
  .map(getDirSize)
  .filter(size => size <= 100000)
  .reduce((a, b) => a + b)

console.log(result1)

const totalSpace = 70000000
const updateSpace = 30000000
const usedSpace = getDirSize(parseInput(input))
const neededSpace = updateSpace - (totalSpace - usedSpace)

const result2 = flattenDir(parseInput(input))
  .map(getDirSize)
  .sort((a, b) => a - b)
  .find(n => n > neededSpace)!

console.log(result2)
