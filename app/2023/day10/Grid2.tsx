import { memo } from 'react'
import styled from 'styled-components'

import { Pixel } from './solution'

interface Props {
  map: Pixel[][]
  water: string[]
  enclosed: string[]
  step: number
}

export default function Grid2({ map, water, enclosed, step }: Props) {
  const height = map.length
  const width = map[0].length

  const curWater = water.slice(0, step)

  const isWater = (y: number, x: number) => curWater.includes(`${y}:${x}`)
  const isWall = (y: number, x: number) => map[y][x] === Pixel.Wall
  const isEnclosed = (y: number, x: number) =>
    enclosed.includes(`${y * 3}:${x * 3}`)

  const color = (y: number, x: number) =>
    isWater(y, x)
      ? 'var(--mantine-color-indigo-6)'
      : isWall(y, x)
      ? 'var(--mantine-color-gray-4)'
      : 'var(--mantine-color-dark-7)'

  return (
    <Container>
      <Grid $cols={width}>
        {Array(height)
          .fill(null)
          .map((_, y) =>
            Array(width)
              .fill(null)
              .map((_, x) => <Cell key={x} $color={color(y, x)} />)
          )}
      </Grid>
      {step === water.length && (
        <TileGrid $cols={width / 3}>
          {Array(height / 3)
            .fill(null)
            .map((_, y) =>
              Array(width / 3)
                .fill(null)
                .map((_, x) => <Tile key={x} $enclosed={isEnclosed(y, x)} />)
            )}
        </TileGrid>
      )}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  min-width: 660px;
`

const Grid = styled.div<{ $cols: number }>`
  display: grid;
  grid-template-columns: repeat(${p => p.$cols}, minmax(0, 1fr));
`

const Cell = memo(styled.div<{
  $color: string
}>`
  background-color: ${p => p.$color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4px;
  line-height: 1;
  font-weight: bold;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  width: 10px;
  aspect-ratio: 1;
`)

const TileGrid = styled.div<{ $cols: number }>`
  position: absolute;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: repeat(${p => p.$cols}, minmax(0, 1fr));
`

const Tile = styled.div<{ $enclosed: boolean }>`
  ${p => p.$enclosed && 'background-color: var(--mantine-color-lime-4);'}
  outline: 1px var(--mantine-color-gray-8);
  outline-style: solid;
  padding: 0;
  font-family: 'Courier New', Courier, monospace;
  width: 30px;
  aspect-ratio: 1;
`
