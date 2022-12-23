import { memo } from 'react'
import styled from 'styled-components'

import { Graph } from './solution12'

interface Props {
  width: number
  height: number
  current: number
  graph: Graph
  result: string[]
  visited: string[]
  start: string
  end: string
}

// TODO: refactor this mess

function Grid({
  width,
  height,
  current,
  graph,
  result,
  visited,
  start,
  end,
}: Props) {
  const visitedYet = visited.slice(0, current + 1)
  const isFinished = current === visited.length - 1

  function renderCell(x: number, y: number) {
    // from hsl(194, 100%, 50%),
    // to hsl(60, 100%, 55%)
    const level = (graph[`${x}:${y}`].char.charCodeAt(0) - 97) / 26
    const color =
      String(x) === start.split(':')[0] && String(y) === start.split(':')[1]
        ? 'rgb(255, 0, 195)'
        : String(x) === end.split(':')[0] && String(y) === end.split(':')[1]
        ? 'white'
        : `hsl(${level * -134 + 194}, 100%, ${level * 5 + 50}%)`
    const isPath = isFinished && result.includes(`${x}:${y}`)
    const isVisited = visitedYet.includes(`${x}:${y}`)

    return (
      <Cell key={x} $color={color} $isVisited={isVisited} $isPath={isPath} />
    )
  }

  return (
    <Container>
      {Array(height)
        .fill(null)
        .map((_, y) => (
          <Row key={y}>
            {Array(width)
              .fill(null)
              .map((_, x) => renderCell(x, y))}
          </Row>
        ))}
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
`
const Row = styled.div`
  display: flex;
`

const Cell = memo(styled.div<{
  $color?: string
  $isVisited: boolean
  $isPath: boolean
}>`
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  background-color: ${p => p.$color || '#111'};
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: black;

  &::before {
    content: '';
    position: absolute;
    border-radius: 4px;
    width: 60%;
    aspect-ratio: 1;

    border: ${p => (p.$isVisited ? '2px dashed #000a' : 'none')};
    background-color: ${p => (p.$isPath ? '#000c' : 'transparent')};
  }
`)

export default Grid
