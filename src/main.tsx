import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider, MantineThemeOverride } from '@mantine/core'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App'
import Home from './components/Home'
import Loader09 from './components/Day09/Loader09'
import Loader10 from './components/Day10/Loader10'
import Loader12 from './components/Day12/Loader12'
import Loader18 from './components/Day18/Loader18'

const theme: MantineThemeOverride = {
  colorScheme: 'dark',
  fontFamily: 'Inter, Avenir, Helvetica, Arial, sans-serif',
  primaryColor: 'lime',
}
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'day09',
        element: <Loader09 />,
      },
      {
        path: 'day10',
        element: <Loader10 />,
      },
      {
        path: 'day12',
        element: <Loader12 />,
      },
      {
        path: 'day18',
        element: <Loader18 />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>
)
