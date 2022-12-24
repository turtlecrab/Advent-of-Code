// import * as fs from 'fs'

// const input = fs
//   .readFileSync(__dirname + '/day18.input.txt', 'utf8')
//   .replace(/\r/g, '')

export function vec(x: number, y: number, z: number) {
  return `${String(x)},${String(y)},${String(z)}`
}

export function parseVoxels(str: string): Set<string> {
  const voxels = new Set<string>()
  for (let line of str.split('\n')) {
    voxels.add(line)
  }
  return voxels
}

export function getAdjacentSurfacesCount(voxels: Set<string>): number {
  let connectedPlanes = 0

  for (let current of voxels) {
    const [x, y, z] = current.split(',').map(Number)
    if (voxels.has(vec(x - 1, y, z))) connectedPlanes += 1
    if (voxels.has(vec(x + 1, y, z))) connectedPlanes += 1
    if (voxels.has(vec(x, y - 1, z))) connectedPlanes += 1
    if (voxels.has(vec(x, y + 1, z))) connectedPlanes += 1
    if (voxels.has(vec(x, y, z - 1))) connectedPlanes += 1
    if (voxels.has(vec(x, y, z + 1))) connectedPlanes += 1
  }
  return connectedPlanes / 2
}

export function getSurfaces(voxels: Set<string>): number {
  return voxels.size * 6 - getAdjacentSurfacesCount(voxels) * 2
}

export function getBoundaries(voxels: Set<string>): {
  x: [number, number]
  y: [number, number]
  z: [number, number]
} {
  const arr = [...voxels]
  const xs = arr.map(s => Number(s.split(',')[0]))
  const ys = arr.map(s => Number(s.split(',')[1]))
  const zs = arr.map(s => Number(s.split(',')[2]))
  return {
    x: [Math.min(...xs), Math.max(...xs)],
    y: [Math.min(...ys), Math.max(...ys)],
    z: [Math.min(...zs), Math.max(...zs)],
  }
}

export function getCounterForm(voxels: Set<string>): Set<string> {
  const bounds = getBoundaries(voxels)
  // expand by 1 voxel every side
  const min = { x: bounds.x[0] - 1, y: bounds.y[0] - 1, z: bounds.z[0] - 1 }
  const max = { x: bounds.x[1] + 1, y: bounds.y[1] + 1, z: bounds.z[1] + 1 }

  const filled = new Set<string>()

  function fill(x: number, y: number, z: number): void {
    // already filled check
    if (filled.has(vec(x, y, z))) return

    // wall check
    if (voxels.has(vec(x, y, z))) return

    // boundary checks
    if (
      x < min.x ||
      x > max.x ||
      y < min.y ||
      y > max.y ||
      z < min.z ||
      z > max.z
    )
      return

    filled.add(vec(x, y, z))

    fill(x + 1, y, z)
    fill(x - 1, y, z)
    fill(x, y + 1, z)
    fill(x, y - 1, z)
    fill(x, y, z + 1)
    fill(x, y, z - 1)
  }
  fill(min.x, min.y, min.z)

  return filled
}

export function getOuterSurfaces(voxels: Set<string>): number {
  const counterVoxels = getCounterForm(voxels)
  const allSurfaces = getSurfaces(counterVoxels)

  const bounds = getBoundaries(voxels)

  const width = bounds.x[1] - bounds.x[0] + 3
  const height = bounds.y[1] - bounds.y[0] + 3
  const depth = bounds.z[1] - bounds.z[0] + 3

  return (
    allSurfaces - width * height * 2 - width * depth * 2 - depth * height * 2
  )
}

// console.log(getSurfaces(parseVoxels(input)))

// console.log(getOuterSurfaces(parseVoxels(input)))
