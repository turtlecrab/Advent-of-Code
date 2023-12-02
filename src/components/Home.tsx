import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Home() {
  return (
    <Container>
      <Year>2022</Year>
      <DayLink to="day09">Day 09</DayLink>
      <DayLink to="day10">Day 10</DayLink>
      <DayLink to="day12">Day 12</DayLink>
      <DayLink to="day18">Day 18</DayLink>
    </Container>
  )
}

const Container = styled.div`
  font-size: 24px;
  display: flex;
  flex-direction: column;
`

const Year = styled.h2`
  margin: 20px 0 0;
  font-size: 20px;
  font-weight: normal;
`

const DayLink = styled(Link)`
  margin: 12px;
`

export default Home
