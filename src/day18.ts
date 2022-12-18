import * as fs from 'fs'

const input = fs
  .readFileSync(__dirname + '/day18.input.txt', 'utf8')
  .replace(/\r/g, '')

export function parseVoxels(str: string): Set<string> {
  const voxels = new Set<string>()
  for (let line of str.split('\n')) {
    voxels.add(line)
  }
  return voxels
}

export function getAdjacentSurfacesCount(voxels: Set<string>): number {
  let connectedPlanes = 0

  const vec = (x: number, y: number, z: number) =>
    `${String(x)},${String(y)},${String(z)}`

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

let a = performance.now()
console.log(getSurfaces(parseVoxels(input)))
console.log(performance.now() - a)
