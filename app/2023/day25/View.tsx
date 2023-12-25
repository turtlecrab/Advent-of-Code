import { memo, useEffect, useRef } from 'react'
import styled from 'styled-components'
import cytoscape from 'cytoscape'
import { useMantineTheme } from '@mantine/core'

interface Props {
  nodes: cytoscape.ElementDefinition[]
  edges: cytoscape.ElementDefinition[]
}

export default memo(({ nodes, edges }: Props) => {
  const theme = useMantineTheme()

  const contRef = useRef<HTMLDivElement>(null)

  const cy = useRef<cytoscape.Core>()

  useEffect(() => {
    if (contRef.current) {
      cy.current = cytoscape({
        layout: {
          name: 'cose',
          // animate: false,
        },
        container: contRef.current,
        elements: [...nodes, ...edges],
        style: [
          {
            selector: 'node',
            style: {
              label: 'data(id)',
              'font-size': 24,
              'background-color': theme.colors.gray[1],
              color: theme.colors.gray[0],
            },
          },
          {
            selector: 'node:selected',
            style: { 'background-color': theme.colors.yellow[4] },
          },
          {
            selector: 'edge',
            style: { 'line-color': theme.colors.gray[6] },
          },
          {
            selector: 'edge:selected',
            style: { 'line-color': theme.colors.yellow[6] },
          },
        ],
      })

      return () => {
        cy.current?.destroy()
      }
    }
  }, [contRef.current, nodes, edges, theme])

  return <Container ref={contRef} />
})

const Container = styled.div`
  width: 700px;
  height: 700px;
`
