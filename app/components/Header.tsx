'use client'

import Link from 'next/link'
import styled from 'styled-components'
import { Group } from '@mantine/core'
import { VscGithubAlt } from 'react-icons/vsc'

export default function Header() {
  return (
    <Group justify="space-between" component="header">
      <Link href="/">Home</Link>
      <GitHubLink
        href="https://github.com/turtlecrab/Advent-of-Code/tree/visualizations"
        aria-label="Github"
        target="_blank"
      >
        <VscGithubAlt size={18} />
      </GitHubLink>
    </Group>
  )
}

const GitHubLink = styled.a`
  display: flex;
  color: rgba(255, 255, 255, 0.87);
  opacity: 0.7;

  &:hover {
    color: rgba(255, 255, 255, 0.87);
    opacity: 1;
  }
`
