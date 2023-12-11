import { Text } from '@mantine/core'

interface Props {
  href: string
  children: React.ReactNode
}

export default function BottomLink({ href, children }: Props) {
  return (
    <Text component="p" mt={28} mb={16}>
      <a href={href} target="_blank">
        {children}
      </a>
    </Text>
  )
}
