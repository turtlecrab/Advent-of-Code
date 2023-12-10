import styled from 'styled-components'
import { useMemo, useState } from 'react'

import Controls from '../../components/Controls'
import View from './View'
import { getBoundaries, getCounterForm, parseVoxels } from './solution18'

export type Vec = [number, number, number]

interface Props {
  input: string
}

function Day18({ input }: Props) {
  const { size, voxels, center, enclosed } = useMemo(() => {
    const voxelsSet = parseVoxels(input)
    const voxels = [...voxelsSet].map(s => s.split(',').map(Number)) as Vec[]

    const bounds = getBoundaries(voxelsSet)
    const center: Vec = [
      (bounds.x[1] - bounds.x[0]) / 2 + bounds.x[0],
      (bounds.y[1] - bounds.y[0]) / 2 + bounds.y[0],
      (bounds.z[1] - bounds.z[0]) / 2 + bounds.z[0],
    ]

    const counter = getCounterForm(voxelsSet)
    const enclosed: Vec[] = []
    for (let x = bounds.x[0]; x <= bounds.x[1]; x++) {
      for (let y = bounds.y[0]; y <= bounds.y[1]; y++) {
        for (let z = bounds.z[0]; z <= bounds.z[1]; z++) {
          if (
            !voxelsSet.has(`${x},${y},${z}`) &&
            !counter.has(`${x},${y},${z}`)
          ) {
            enclosed.push([x, y, z])
          }
        }
      }
    }

    return { size: voxels.length, voxels, center, enclosed }
  }, [input])

  const [show, setShow] = useState(size)

  return (
    <>
      <Controls
        current={show}
        setCurrent={setShow}
        max={size}
        fastSpeed={100}
        slowSpeed={500}
      />
      <View voxels={voxels} show={show} center={center} enclosed={enclosed} />
    </>
  )
}

const Container = styled.div``

export default Day18
