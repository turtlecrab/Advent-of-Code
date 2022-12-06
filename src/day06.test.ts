import { getStartMarkerIndex } from './day06'

describe('getStartIndex', () => {
  it('works for start-of-packet w/ length=4', () => {
    expect(getStartMarkerIndex('bvwbjplbgvbhsrlpgdmjqwftvncz', 4)).toBe(5)
    expect(getStartMarkerIndex('nppdvjthqldpwncqszvftbrmjlhg', 4)).toBe(6)
    expect(getStartMarkerIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 4)).toBe(10)
    expect(getStartMarkerIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 4)).toBe(11)
  })
  it('works for start-of-message w/ length=14', () => {
    expect(getStartMarkerIndex('mjqjpqmgbljsphdztnvjfqwrcgsmlb', 14)).toBe(19)
    expect(getStartMarkerIndex('bvwbjplbgvbhsrlpgdmjqwftvncz', 14)).toBe(23)
    expect(getStartMarkerIndex('nppdvjthqldpwncqszvftbrmjlhg', 14)).toBe(23)
    expect(getStartMarkerIndex('nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 14)).toBe(
      29
    )
    expect(getStartMarkerIndex('zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 14)).toBe(26)
  })
})
