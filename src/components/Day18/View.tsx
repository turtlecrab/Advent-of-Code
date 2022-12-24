import styled from 'styled-components'
import { Canvas, ThreeElements } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { Checkbox } from '@mantine/core'
import { useState } from 'react'

interface Props {
  voxels: [number, number, number][]
  center: [number, number, number]
}

function View({ voxels, center }: Props) {
  const [wireframe, setWireframe] = useState(false)
  const [rotate, setRotate] = useState(true)

  const maxSide = Math.max(...center)

  return (
    <>
      <Container>
        <Canvas>
          {/* [12, 12, 40] */}
          <PerspectiveCamera
            makeDefault
            position={[maxSide * 3, maxSide * 3, maxSide * 3]}
          />
          <OrbitControls
            autoRotate={rotate}
            autoRotateSpeed={2}
            target={center}
          />

          {/* <ambientLight /> */}
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
      <div style={{ display: 'flex', gap: 24, justifyContent: 'end' }}>
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
      </div>

      {/* <div style={{ display: 'flex', gap: 12 }}>
        {center.map((n, i) => (
          <p key={i}>{n}</p>
        ))}
        <p>maxSide: {maxSide}</p>
      </div> */}
    </>
  )
}

function Voxel(
  props: ThreeElements['mesh'] & { color?: string; wireframe?: boolean }
) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={props.color || 'white'} />
      {/* <meshPhongMaterial /> */}
      {props.wireframe && <meshNormalMaterial wireframe />}
    </mesh>
  )
}

const Container = styled.div`
  width: 480px;
  height: 480px;
`

export default View
