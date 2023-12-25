export function parseGraph(input: string) {
  const graph = new Map<string, Set<string>>()
  const edges = new Set<string>()

  input = input.replace(/\r/g, '')

  input.split('\n').forEach(line => {
    const [id, right] = line.split(':').map(s => s.trim())
    const paths = right.split(/\s+/)

    for (let node of [id, ...paths]) {
      if (!graph.has(node)) {
        graph.set(node, new Set<string>())
      }
    }

    for (let path of paths) {
      graph.get(id)!.add(path)
      graph.get(path)!.add(id)

      const key = [id, path].sort().join('-')
      edges.add(key)
    }
  })

  return {
    graph,
    edges,
  }
}
