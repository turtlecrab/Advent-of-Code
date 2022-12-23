import styled from 'styled-components'
import { useMemo, useState } from 'react'

import Controls from '../Controls'
import Grid from './Grid'
import { getShortestPath, parseGraph, parseStartEnd } from './solution12'
// import { Select } from '@mantine/core'

interface Props {
  input: string
}

function Day12({ input }: Props) {
  const [step, setStep] = useState(0)

  const { graph, width, height, result, visited, start, end } = useMemo(() => {
    const graph = parseGraph(input)
    const width = input.split('\n')[0].length
    const height = input.split('\n').length

    const { start, end } = parseStartEnd(input)
    const { result, visited } = getShortestPath(graph, start, end)

    return { graph, width, height, result, visited, start, end }
  }, [input])

  return (
    <>
      <Controls
        current={step}
        setCurrent={setStep}
        max={visited.length - 1}
        fastSpeed={20}
        slowSpeed={100}
      />
      <Grid
        graph={graph}
        width={width}
        height={height}
        current={step}
        result={result}
        visited={visited}
        start={`${start.x}:${start.y}`}
        end={`${end.x}:${end.y}`}
      />

      {/* <Select
        data={['Part 1', 'Part 2']}
        defaultValue="Part 1"
        style={{ alignSelf: 'start', paddingTop: 24 }}
      ></Select> */}
    </>
  )
}

const Container = styled.div``

export default Day12
