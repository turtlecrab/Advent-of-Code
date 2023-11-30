import {
  getAdjacentSurfacesCount,
  getBoundaries,
  getOuterSurfaces,
  getSurfaces,
  parseVoxels,
} from './day18'

const testInput = `2,2,2
1,2,2
3,2,2
2,1,2
2,3,2
2,2,1
2,2,3
2,2,4
2,2,6
1,2,5
3,2,5
2,1,5
2,3,5`

describe('parseVoxels', () => {
  it('parses', () => {
    const voxels = parseVoxels(testInput)
    expect(voxels.size).toBe(13)
    expect(voxels.has('3,2,2')).toBe(true)
    expect(voxels.has('1,2,5')).toBe(true)
    expect(voxels.has('1,1,1')).toBe(false)
  })
})

describe('getAdjacentSurfacesCount', () => {
  it('works for 2 adjacent', () => {
    const voxels = parseVoxels('2,2,2\n1,2,2')
    expect(getAdjacentSurfacesCount(voxels)).toBe(1)
  })
  it('works for 4 adjacent', () => {
    const voxels = parseVoxels('2,2,2\n1,2,2\n3,2,2\n2,1,2')
    expect(getAdjacentSurfacesCount(voxels)).toBe(3)
  })
  it('works for more', () => {
    const voxels = parseVoxels(
      '2,2,2\n1,2,2\n3,2,2\n2,1,2\n2,3,2\n2,2,1\n2,2,3\n2,2,4'
    )
    expect(getAdjacentSurfacesCount(voxels)).toBe(7)
  })
  it('works for one more', () => {
    const voxels = parseVoxels(
      '2,2,2\n1,2,2\n3,2,2\n2,1,2\n2,3,2\n2,2,1\n2,2,3\n2,2,4\n2,2,6'
    )
    expect(getAdjacentSurfacesCount(voxels)).toBe(7)
  })
  it('works for test input', () => {
    const voxels = parseVoxels(testInput)
    expect(getAdjacentSurfacesCount(voxels)).toBe(7)
  })
})

describe('getSurfaces', () => {
  it('gets it', () => {
    const voxels = parseVoxels(testInput)
    expect(getSurfaces(voxels)).toBe(64)
  })
})

describe('getBoundaries', () => {
  it('gets it', () => {
    expect(getBoundaries(parseVoxels(testInput))).toEqual({
      x: [1, 3],
      y: [1, 3],
      z: [1, 6],
    })
  })
})

describe('getOuterSurfaces', () => {
  it('gets it', () => {
    expect(getOuterSurfaces(parseVoxels(testInput))).toBe(58)
  })
})
