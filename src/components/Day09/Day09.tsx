import styled from 'styled-components'
import { useMemo, useState } from 'react'

import {
  getNextHead,
  getNextTail,
  parseMoves,
  Move,
  Position,
} from './solution09'
import Grid from './Grid'
import Controls from '../Controls'

// helper function for fragmenting the moves, not needed in the solution
const fragMoves = (moves: Move[]): Move[] =>
  moves.flatMap(m =>
    m.amount > 1
      ? Array(m.amount)
          .fill({ ...m, amount: 1 })
          .map(obj => ({ ...obj }))
      : m
  )

interface Props {
  input: string
  ropeLength: number
}

function Day09({ input, ropeLength }: Props) {
  const moves = fragMoves(parseMoves(input))

  const { timeline, visited, grid } = useMemo(() => {
    const timeline: Position[][] = []
    const initialRope: Position[] = Array(ropeLength)
      .fill({ x: 0, y: 0 })
      .map(obj => ({ ...obj })) // not needed but feels right
    timeline.push(initialRope)

    const visited: Set<string>[] = [new Set()]
    visited[0].add('0:0')

    for (let { direction } of moves) {
      const prev = timeline.at(-1)!
      const rope: Position[] = []

      rope[0] = getNextHead(prev[0], direction)
      for (let j = 1; j < ropeLength; j++) {
        rope[j] = getNextTail(rope[j - 1], prev[j])
      }
      timeline.push(rope)
      visited.push(
        new Set([...visited.at(-1)!, `${rope.at(-1)!.x}:${rope.at(-1)!.y}`])
      )
    }

    const allVisited = new Set(timeline.flat().map(pos => `${pos.x}:${pos.y}`))

    const allX = [...allVisited].map(p => Number(p.split(':')[0]))
    const minX = Math.min(...allX)
    const maxX = Math.max(...allX)
    const allY = [...allVisited].map(p => Number(p.split(':')[1]))
    const minY = Math.min(...allY)
    const maxY = Math.max(...allY)

    const grid = {
      width: maxX - minX + 1,
      height: maxY - minY + 1,
      offset: { x: -minX, y: -minY },
    }

    return { timeline, visited, grid }
  }, [moves, ropeLength])

  const [moveNum, setMoveNum] = useState(0)

  return (
    <Container>
      <Controls
        current={moveNum}
        setCurrent={setMoveNum}
        max={moves.length}
        slowSpeed={150}
        fastSpeed={30}
      />

      <Grid
        width={grid.width}
        height={grid.height}
        offset={grid.offset}
        rope={timeline[moveNum]}
        visited={visited[moveNum]}
      />
    </Container>
  )
}

const Container = styled.div``

export default Day09
