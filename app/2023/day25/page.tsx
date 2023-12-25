'use client'

import { useState } from 'react'
import {
  Button,
  Group,
  MantineProvider,
  Modal,
  Stack,
  Textarea,
} from '@mantine/core'

import { input1 } from './input'
import BottomLink from '@/components/BottomLink'
import DayHeader from '@/components/DayHeader'
import Day25 from './Day25'
import { grayTheme } from '@/theme'

export default function Page() {
  const [modalOpened, setModalOpened] = useState(false)
  const [customInput, setCustomInput] = useState('')
  const [inputTextarea, setInputTextarea] = useState('')

  const onInputSubmit = () => {
    setModalOpened(false)
    setCustomInput(inputTextarea.trim())
    setInputTextarea('')
  }

  return (
    <MantineProvider defaultColorScheme="dark" theme={grayTheme}>
      <Group justify="space-between">
        <DayHeader>Day 25</DayHeader>
        <Group>
          {customInput && (
            <Button
              size="md"
              variant="subtle"
              onClick={() => setCustomInput('')}
            >
              Reset input
            </Button>
          )}
          <Button
            size="md"
            variant="subtle"
            onClick={() => setModalOpened(true)}
          >
            Change input
          </Button>
        </Group>
      </Group>

      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        centered
      >
        <Stack>
          <Textarea
            data-autofocus
            label="Paste your puzzle input here"
            placeholder="Your input"
            description=" "
            value={inputTextarea}
            onChange={e => setInputTextarea(e.currentTarget.value)}
            size="lg"
          />
          <Group>
            <Button
              size="md"
              color="indigo"
              disabled={!inputTextarea}
              onClick={onInputSubmit}
            >
              Draw graph
            </Button>
            (this may take several minutes)
          </Group>
        </Stack>
      </Modal>

      <Day25 input={customInput || input1} />

      <BottomLink href="https://adventofcode.com/2023/day/25">
        Day 25: Snowverload
      </BottomLink>
    </MantineProvider>
  )
}
