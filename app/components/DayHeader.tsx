import { Text } from '@mantine/core'

interface Props {
  children: React.ReactNode
}

export default function DayHeader({ children }: Props) {
  return (
    <Text component="h1" my={34} mr={48} fz={51.2} fw={700} lh={1.1}>
      {children}
    </Text>
  )
}
