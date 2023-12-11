'use client'

import { useState } from 'react'
import { Group, Select } from '@mantine/core'

import Part1 from './Part1'
import { input } from './input'
import BottomLink from '@/components/BottomLink'

export default function Page() {
  const [part, setPart] = useState('1')

  return (
    <>
      <Group justify="space-between">
        <h1>Day 10</h1>
        {/* <Select
          checkIconPosition="right"
          value={part}
          onChange={val => setPart(val!)}
          data={[
            { value: '1', label: 'Part 1' },
            { value: '2', label: 'Part 2' },
          ]}
        /> */}
      </Group>

      <Part1 input={input} />

      <BottomLink href="https://adventofcode.com/2023/day/10">
        Day 10: Pipe Maze
      </BottomLink>
    </>
  )
}
