import { memo } from 'react'
import styled from 'styled-components'

import { Position } from './solution09'

interface Props {
  width: number
  height: number
  offset: Position
  rope: Position[]
  visited: Set<string>
}

function Grid({ width, height, offset, rope, visited }: Props) {
  function getPlace(x: number, y: number): number | null {
    for (let i in rope) {
      if (rope[i].x + offset.x === x && rope[i].y + offset.y === y)
        return Number(i)
    }
    return null
  }
  function isVisited(x: number, y: number): boolean {
    return visited.has(`${x - offset.x}:${y - offset.y}`)
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
                const border = isVisited(x, y)
                  ? '1px dashed hsl(80 68.3% 46.9%)'
                  : 'none'
                if (getPlace(x, y) === 0) {
                  return (
                    <Cell
                      key={x}
                      $color="hsl(35 100% 55.5%)"
                      $border={border}
                    />
                  )
                }
                if (getPlace(x, y) === rope.length - 1) {
                  return (
                    <Cell
                      key={x}
                      $color="hsl(80 68.3% 46.9%)"
                      $border={border}
                    />
                  )
                }
                if (getPlace(x, y)! > 0) {
                  return (
                    <Cell
                      key={x}
                      $color="hsl(50 100% 48.5%)"
                      $border={border}
                    />
                  )
                }
                return <Cell key={x} $border={border} />
              })}
          </Row>
        ))}
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 480px;
`
const Row = styled.div`
  display: flex;
`

const Cell = memo(styled.div<{ $color?: string; $border: string }>`
  flex: 1;
  aspect-ratio: 1;
  border-radius: 2px;
  background-color: ${p => p.$color || '#444'};
  outline: ${p => p.$border};
  min-width: 20px;
  margin: 0 1px 1px 0;
`)

export default Grid
