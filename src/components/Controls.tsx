import { Button, Radio, Slider } from '@mantine/core'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

interface Props {
  current: number
  setCurrent: React.Dispatch<React.SetStateAction<number>>
  max: number
  fastSpeed: number
  slowSpeed: number
}

function Controls({ current, setCurrent, max, fastSpeed, slowSpeed }: Props) {
  const inc = () => setCurrent(prev => Math.min(max, prev + 1))
  const dec = () => setCurrent(prev => Math.max(0, prev - 1))

  const incAndStop = () => {
    setIsPlaying(false)
    inc()
  }
  const decAndStop = () => {
    setIsPlaying(false)
    dec()
  }
  const setAndStop = (value: number) => {
    setIsPlaying(false)
    setCurrent(value)
  }

  const [isPlaying, setIsPlaying] = useState(false)
  const togglePlay = () => setIsPlaying(!isPlaying)
  const [slowMode, setSlowMode] = useState(true)
  const handleModeChange = (value: string) => {
    if (value === 'slow') {
      setSlowMode(true)
    } else {
      setSlowMode(false)
    }
  }
  useEffect(() => {
    if (isPlaying) {
      inc()
      const _interval = setInterval(inc, slowMode ? slowSpeed : fastSpeed)
      return () => clearInterval(_interval)
    }
  }, [isPlaying, slowMode, fastSpeed, slowSpeed])

  useEffect(() => {
    if (current === max) setIsPlaying(false)
  }, [current])
  return (
    <Container>
      <div>
        <Button disabled={current === 0} onClick={decAndStop}>
          ←
        </Button>
        <Button disabled={current === max} onClick={togglePlay}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button disabled={current === max} onClick={incAndStop}>
          →
        </Button>
        <RadioGroup
          name="speed"
          value={slowMode ? 'slow' : 'fast'}
          onChange={handleModeChange}
        >
          <Radio value="slow" label="Slow" />
          <Radio value="fast" label="Fast" />
        </RadioGroup>
      </div>
      <Slider min={0} max={max} value={current} onChange={setAndStop} />
    </Container>
  )
}

const Container = styled.div`
  padding-block: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    gap: 10px;
  }
`

const RadioGroup = styled(Radio.Group)`
  margin-left: 24px;

  @media screen and (min-width: 400px) {
    margin-left: 48px;
  }
`

export default Controls
