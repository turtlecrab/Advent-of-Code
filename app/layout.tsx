import type { Metadata } from 'next'
import { MantineProvider } from '@mantine/core'

import '@mantine/core/styles.css'
import './index.css'
import { theme } from '@/theme'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Advent of Code visualizations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">
          <MantineProvider defaultColorScheme="dark" theme={theme}>
            <Header />
            {children}
          </MantineProvider>
        </div>
      </body>
    </html>
  )
}
