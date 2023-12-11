import { useMemo, useState } from 'react'

import Controls from '@/components/Controls'
import Grid from './Grid2'
import { getEnclosedTiles, getFloodFilledPixelMap } from './solution'

interface Props {
  input: string
}

export default function Day10Part2({ input }: Props) {
  const [step, setStep] = useState(0)

  const { map, water, enclosed } = useMemo(() => {
    const {
      origMap: map,
      waterArr: water,
      pixelMap,
    } = getFloodFilledPixelMap(input)
    const enclosed = getEnclosedTiles(pixelMap)

    return { map, water, enclosed }
  }, [input])

  return (
    <>
      <Controls
        current={step}
        setCurrent={setStep}
        max={water.length}
        fastSpeed={5}
        slowSpeed={100}
      />
      <Grid map={map} water={water} enclosed={enclosed} step={step} />
    </>
  )
}
