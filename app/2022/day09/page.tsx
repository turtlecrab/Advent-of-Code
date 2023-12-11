'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Select } from '@mantine/core'

import Day09 from './Day09'
import { input1, input2 } from './input09'

function Loader09() {
  const [selectedInput, setSelectedInput] = useState('input1')
  const input = selectedInput === 'input1' ? input1 : input2
  return (
    <Container>
      <TopSection>
        <h1>Day 9</h1>
        <Select
          checkIconPosition="right"
          allowDeselect={false}
          value={selectedInput}
          onChange={val => setSelectedInput(val!)}
          data={[
            { value: 'input1', label: 'Input #1' },
            { value: 'input2', label: 'Input #2' },
          ]}
        ></Select>
      </TopSection>
      <Day09 input={input} ropeLength={10} key={selectedInput} />
      <p>
        <a href="https://adventofcode.com/2022/day/9">Day 9: Rope Bridge</a>
      </p>
    </Container>
  )
}

const Container = styled.div``

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Loader09
