import { getBlockingWall, getPath } from './day18'

const testInput = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`

describe('getPath', () => {
  it('works for test input', () => {
    expect(getPath(6, testInput.split('\n').slice(0, 12))?.step).toBe(22)
  })
})

describe('getBlockingWall', () => {
  it('works for test input', () => {
    expect(getBlockingWall(6, testInput.split('\n'))).toBe('6,1')
  })
})
