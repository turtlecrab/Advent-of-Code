import styled from 'styled-components'
import { useMemo, useState } from 'react'

import Controls from '@/components/Controls'
import Grid from './Grid1'
import { Position, findLoop, getAnimalPosition, parseMap } from './solution'

interface Props {
  input: string
}

export default function Day10Part1({ input }: Props) {
  const [step, setStep] = useState(0)

  const { map, start, end, pairs, length } = useMemo(() => {
    const map = parseMap(input)

    const start = getAnimalPosition(map)
    let [first, second] = findLoop(map)
    const end = first.pos
    const length = first.length

    const pairs: [Position, Position][] = []

    while (first && second) {
      pairs.unshift([first.pos, second.pos])

      first = first.via!
      second = second.via!
    }

    return { map, start, end, pairs, length }
  }, [input])

  return (
    <>
      <Controls
        current={step}
        setCurrent={setStep}
        max={length}
        fastSpeed={20}
        slowSpeed={100}
      />
      <Grid
        map={map}
        start={start}
        end={end}
        pairs={pairs}
        length={length}
        step={step}
      />
    </>
  )
}

const Container = styled.div``
