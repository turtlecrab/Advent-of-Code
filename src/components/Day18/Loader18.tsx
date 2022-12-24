import { MantineProvider, Select } from '@mantine/core'
import { useState } from 'react'
import styled from 'styled-components'

import Day18 from './Day18'
import { inputs } from './input18'

function Loader12() {
  const [selectedInput, setSelectedInput] = useState(0)

  return (
    <Container>
      <MantineProvider theme={{ primaryColor: 'gray', colorScheme: 'dark' }}>
        <TopSection>
          <Header>Day 18</Header>
          <Select
            value={String(selectedInput)}
            onChange={val => setSelectedInput(Number(val))}
            data={inputs.map((_, i) => ({
              value: String(i),
              label: 'Input #' + (i + 1),
            }))}
          ></Select>
        </TopSection>
        <Day18 input={inputs[selectedInput]} key={selectedInput} />
        <p>
          <a href="https://adventofcode.com/2022/day/12">
            Day 18: Boiling Boulders
          </a>
        </p>
      </MantineProvider>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Header = styled.h1`
  margin-right: 48px;
`

export default Loader12
