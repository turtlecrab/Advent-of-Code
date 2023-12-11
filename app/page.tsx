import Link from 'next/link'
import { Stack, Text } from '@mantine/core'
import { ReactNode } from 'react'

export default function Home() {
  return (
    <div style={{ fontSize: 24 }}>
      <Stack gap="0">
        <Year>2023</Year>
        <Days>
          <Link href="/2023/day10">Day 10</Link>
        </Days>
        <Year>2022</Year>
        <Days>
          <Link href="/2022/day09">Day 09</Link>
          <Link href="/2022/day10">Day 10</Link>
          <Link href="/2022/day12">Day 12</Link>
          <Link href="/2022/day18">Day 18</Link>
        </Days>
      </Stack>
    </div>
  )
}

const Year = ({ children }: { children: ReactNode }) => (
  <Text size="xl" pt="lg" component="h2">
    {children}
  </Text>
)

const Days = ({ children }: { children: ReactNode }) => (
  <Stack pl="md" gap="xs" align="flex-start">
    {children}
  </Stack>
)
