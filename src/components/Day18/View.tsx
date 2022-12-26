import styled from 'styled-components'
import { Canvas, ThreeElements } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Checkbox } from '@mantine/core'
import { memo, useMemo, useState } from 'react'

import type { Vec } from './Day18'

interface Props {
  show: number
  voxels: Vec[]
  center: Vec
  enclosed: Vec[]
}

function View({ show, voxels, center, enclosed }: Props) {
  const [sort, setSort] = useState(false)
  const [showEnclosed, setShowEnclosed] = useState(false)
  const [rotate, setRotate] = useState(true)
  const [wireframe, setWireframe] = useState(false)

  const maxSide = Math.max(...center)

  const sortedVoxels = useMemo(() => {
    const sorted = [...voxels]
    if (sort) sorted.sort((a, b) => a[1] - b[1] || a[2] - b[2] || a[0] - b[0])
    return sorted
  }, [voxels, sort])

  return (
    <>
      <Container>
        <Canvas>
          <PerspectiveCamera
            makeDefault
            position={[maxSide * 3, maxSide * 3, maxSide * 3]}
          />
          <OrbitControls
            autoRotate={rotate}
            autoRotateSpeed={2}
            target={center}
          />
          <ambientLight intensity={0.02} />
          <directionalLight
            color="white"
            position={[9, 20, -10]}
            intensity={0.1}
          />
          <directionalLight color="#A5D8FF" position={[-9, 20, 10]} />

          {sortedVoxels.slice(0, show).map(v => (
            <Voxel position={v} key={v.join()} wireframe={wireframe} />
          ))}

          {showEnclosed &&
            enclosed.map(e => (
              <Voxel position={e} key={e.join()} color="#ff00ff" enclosed />
            ))}
        </Canvas>
      </Container>
      <BottomControls>
        <Checkbox
          checked={sort}
          onChange={e => setSort(e.currentTarget.checked)}
          label="Sort"
        />
        <Checkbox
          checked={rotate}
          onChange={e => setRotate(e.currentTarget.checked)}
          label="Rotate"
        />
        <Checkbox
          checked={wireframe}
          onChange={e => setWireframe(e.currentTarget.checked)}
          label="Wireframes"
        />
        <Checkbox
          checked={showEnclosed}
          onChange={e => setShowEnclosed(e.currentTarget.checked)}
          label="Show enclosed"
        />
      </BottomControls>
    </>
  )
}

const Voxel = memo(
  (
    props: ThreeElements['mesh'] & {
      color?: string
      wireframe?: boolean
      enclosed?: boolean
    }
  ) => {
    return (
      <mesh {...props}>
        <boxGeometry args={[1, 1, 1]} />

        {props.enclosed ? (
          <meshStandardMaterial
            color={props.color}
            emissive={'white'}
            emissiveIntensity={0.02}
          />
        ) : props.wireframe ? (
          <meshNormalMaterial wireframe />
        ) : (
          <meshStandardMaterial color={props.color || 'white'} />
        )}
      </mesh>
    )
  }
)

const Container = styled.div`
  width: 100%;
  aspect-ratio: 1;

  @media screen and (min-width: 600px) {
    width: 480px;
  }
`

const BottomControls = styled.div`
  display: flex;
  gap: 24px;
  justify-content: end;
  margin-top: 8px;
`

export default View
