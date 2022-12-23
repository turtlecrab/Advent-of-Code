import { memo } from 'react'
import styled from 'styled-components'

interface Props {
  current: number
  width: number
  spritePos: number[]
  pixels: string[]
}

function Grid({ current, width, pixels, spritePos }: Props) {
  const height = spritePos.length / width

  const pixelsYet = pixels.slice(0, current + 1)

  const sprite = {
    x: spritePos[current] % width,
    y: Math.floor(current / width),
  }

  return (
    <Container>
      {Array(height)
        .fill(null)
        .map((_, y) => (
          <Row key={y}>
            {Array(width)
              .fill(null)
              .map((_, x) => {
                return (
                  <Cell
                    key={x}
                    $color={
                      pixelsYet[y * width + x] === '#'
                        ? 'orange'
                        : pixelsYet[y * width + x] === '.'
                        ? '#333'
                        : '#111'
                    }
                  />
                )
              })}
          </Row>
        ))}
      <Sprite
        style={{
          transform: `translate(${sprite.x * 21 - 22}px, ${
            sprite.y * 21 - 1
          }px)`,
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 840px;
`
const Row = styled.div`
  display: flex;
`

const Cell = memo(styled.div<{ $color?: string }>`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 2px;
  background-color: ${p => p.$color || '#444'};
  width: 20px;
  margin: 0 1px 1px 0;
`)

const Sprite = styled.div`
  position: absolute;
  width: 64px;
  height: 22px;
  outline: 4px dashed #ff00c3;
  border-radius: 2px;
  transition: all 150ms;
`

export default Grid
