import styled from 'styled-components'
import { useMemo, useState } from 'react'

import { getPixels, getVaules, parseAndFlat } from './solution10'
import Controls from '../Controls'
import Grid from './Grid'

interface Props {
  input: string
}

function Day10({ input }: Props) {
  const [actionNum, setActionNum] = useState(0)

  const { values, pixels } = useMemo(() => {
    const actions = parseAndFlat(input)
    const values = getVaules(actions)
    const pixels = getPixels(values, 40)

    return { values, pixels }
  }, [input])

  return (
    <>
      <Controls
        current={actionNum}
        setCurrent={setActionNum}
        max={values.length - 1}
        fastSpeed={50}
        slowSpeed={150}
      />
      <Grid width={40} pixels={pixels} spritePos={values} current={actionNum} />
    </>
  )
}

const Container = styled.div``

export default Day10
