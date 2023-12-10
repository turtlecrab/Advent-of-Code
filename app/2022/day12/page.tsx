'use client'

import { MantineProvider, Select } from '@mantine/core'
import { useState } from 'react'
import styled from 'styled-components'

import { grayTheme } from '@/theme'
import Day12 from './Day12'
import { inputs } from './input12'

function Loader12() {
  const [selectedInput, setSelectedInput] = useState(0)

  return (
    <Container>
      <MantineProvider defaultColorScheme="dark" theme={grayTheme}>
        <TopSection>
          <Header>Day 12</Header>
          <Select
            checkIconPosition="right"
            value={String(selectedInput)}
            onChange={val => setSelectedInput(Number(val))}
            data={inputs.map((_, i) => ({
              value: String(i),
              label: 'Input #' + (i + 1),
            }))}
          ></Select>
        </TopSection>
        <Day12 input={inputs[selectedInput]} key={selectedInput} />
        <p>
          <a href="https://adventofcode.com/2022/day/12">
            Day 12: Hill Climbing Algorithm
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
