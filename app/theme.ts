import { createTheme } from '@mantine/core'

export const theme = createTheme({
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  primaryColor: 'lime',
})

export const grayTheme = createTheme({
  ...theme,
  primaryColor: 'gray',
})
