import { Dir, File, flattenDir, getDirSize, parseInput } from './day07'

const testInput1 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat`

const testInput2 = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

describe('parseInput', () => {
  it('parses empty string', () => {
    expect(parseInput('')).toEqual<Dir>({
      name: '/',
      children: [],
    })
  })
  it('parses smol dir', () => {
    expect(parseInput(testInput1)).toEqual<Dir>({
      name: '/',
      children: [
        {
          name: 'a',
          children: [],
        },
        { name: 'b.txt', size: 14848514 },
        { name: 'c.dat', size: 8504156 },
      ],
    })
  })
  it('parses bigger dir', () => {
    expect(parseInput(testInput2)).toEqual<Dir>({
      name: '/',
      children: [
        {
          name: 'a',
          children: [
            {
              name: 'e',
              children: [{ name: 'i', size: 584 }],
            },
            { name: 'f', size: 29116 },
            { name: 'g', size: 2557 },
            { name: 'h.lst', size: 62596 },
          ],
        },
        { name: 'b.txt', size: 14848514 },
        { name: 'c.dat', size: 8504156 },
        {
          name: 'd',
          children: [
            { name: 'j', size: 4060174 },
            { name: 'd.log', size: 8033020 },
            { name: 'd.ext', size: 5626152 },
            { name: 'k', size: 7214296 },
          ],
        },
      ],
    })
  })
})

describe('getDirSize', () => {
  it('gets the size of an empty dir', () => {
    expect(
      getDirSize({
        name: '/',
        children: [],
      })
    ).toBe(0)
  })
  it('gets the size of a smol dir', () => {
    expect(getDirSize(parseInput(testInput1))).toBe(14848514 + 8504156)
  })
  it('gets the size of a bigger dir', () => {
    expect(getDirSize(parseInput(testInput2))).toBe(
      14848514 +
        8504156 +
        29116 +
        2557 +
        62596 +
        584 +
        4060174 +
        8033020 +
        5626152 +
        7214296
    )
  })
})

describe('flattenDir', () => {
  it('flattens an empty dir', () => {
    expect(flattenDir(parseInput(''))).toHaveLength(1)
  })
  it('flattens non-empty dir', () => {
    expect(flattenDir(parseInput(testInput2))).toHaveLength(4)
  })
})
