import { memo } from 'react'
import styled from 'styled-components'

import { Position, Map, asciiArt } from './solution'

interface Props {
  map: Map
  start: Position
  end: Position
  pairs: [Position, Position][]
  length: number
  step: number
}

export default function Grid1({ map, start, end, pairs, length, step }: Props) {
  const height = map.length
  const width = map[0].length

  const path = pairs
    .slice(0, step)
    .flat()
    .map(pos => `${pos.y}:${pos.x}`)

  const isPath = (y: number, x: number) => path.includes(`${y}:${x}`)
  const isFinal = (y: number, x: number) =>
    y === end.y && x === end.x && step === length
  const isStart = (y: number, x: number) => y === start.y && x === start.x
  const isEnd = (y: number, x: number) =>
    y === end.y && x === end.x && step === length

  const color = (y: number, x: number) =>
    isStart(y, x)
      ? 'var(--mantine-color-lime-4)'
      : isFinal(y, x)
      ? 'var(--mantine-color-gray-2)'
      : isPath(y, x)
      ? 'var(--mantine-color-yellow-4)'
      : 'var(--mantine-color-gray-6)'

  return (
    <Grid $cols={width}>
      {Array(height)
        .fill(null)
        .map((_, y) =>
          Array(width)
            .fill(null)
            .map((_, x) => (
              <Cell key={x} $color={color(y, x)} $isEnd={isEnd(y, x)}>
                {asciiArt(map[y][x])}
              </Cell>
            ))
        )}
    </Grid>
  )
}

const Grid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols}, minmax(0, 1fr));
`

const Cell = memo(styled.div<{
  $color: string
  $isEnd: boolean
}>`
  background-color: ${p => p.$isEnd && 'var(--mantine-color-lime-8)'};
  color: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  line-height: 1;
  font-weight: bold;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
`)
