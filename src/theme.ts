import { MantineThemeOverride } from '@mantine/core'

export const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  primaryColor: 'lime',
}

export const grayTheme: MantineThemeOverride = {
  ...theme,
  primaryColor: 'gray',
}
