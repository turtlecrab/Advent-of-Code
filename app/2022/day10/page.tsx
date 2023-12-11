'use client'

import { Select } from '@mantine/core'
import { useState } from 'react'
import styled from 'styled-components'

import Day10 from './Day10'
import { input1, input2 } from './input10'

function Loader10() {
  const [selectedInput, setSelectedInput] = useState('input1')
  const input = selectedInput === 'input1' ? input1 : input2

  return (
    <>
      <TopSection>
        <h1>Day 10</h1>
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
      <Day10 input={input} />
      <p>
        <a href="https://adventofcode.com/2022/day/10">
          Day 10: Cathode-Ray Tube
        </a>
      </p>
    </>
  )
}

const Container = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
`

const TopSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default Loader10
