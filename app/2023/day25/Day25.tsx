import { useMemo } from 'react'

import View from './View'
import { parseGraph } from './solution'

export type Vec = [number, number, number]

interface Props {
  input: string
}

export default function Day25({ input }: Props) {
  const { nodes, edges } = useMemo(() => {
    const { graph, edges } = parseGraph(input)

    const nodes = [...graph.keys()].map(id => ({
      data: { id },
    }))

    const objEdges = [...edges.keys()].map(edge => ({
      data: {
        id: edge,
        source: edge.split('-')[0],
        target: edge.split('-')[1],
      },
    }))

    return { nodes, edges: objEdges }
  }, [input])

  return <View nodes={nodes} edges={edges} />
}
