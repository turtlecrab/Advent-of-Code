import styled from 'styled-components'
import { Canvas, ThreeElements } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Checkbox } from '@mantine/core'
import { useState } from 'react'

import { Vec } from './Day18'

interface Props {
  voxels: Vec[]
  center: Vec
}

function View({ voxels, center }: Props) {
  const [wireframe, setWireframe] = useState(false)
  const [rotate, setRotate] = useState(true)

  const maxSide = Math.max(...center)

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

          {voxels.map(v => (
            <Voxel position={v} key={v.join()} wireframe={wireframe} />
          ))}
        </Canvas>
      </Container>
      <BottomControls>
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
      </BottomControls>
    </>
  )
}

function Voxel(
  props: ThreeElements['mesh'] & { color?: string; wireframe?: boolean }
) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      {props.wireframe ? (
        <meshNormalMaterial wireframe />
      ) : (
        <meshStandardMaterial color={props.color || 'white'} />
      )}
    </mesh>
  )
}

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
`

export default View
