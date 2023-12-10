import styled, { keyframes } from 'styled-components'
import { BsSnow2 } from 'react-icons/bs'

function Spinner() {
  return (
    <Container>
      <Icon size={48} />
    </Container>
  )
}

const Container = styled.div`
  min-height: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const spinAnim = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const Icon = styled(BsSnow2)`
  animation-name: ${spinAnim};
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`

export default Spinner
