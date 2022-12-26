import { Link, Outlet } from 'react-router-dom'
import styled from 'styled-components'

import { VscGithubAlt } from 'react-icons/vsc'

function App() {
  return (
    <>
      <Header>
        <Link to="/">Home</Link>
        <GitHubLink
          href="https://github.com/turtlecrab/Advent-of-Code-2022/tree/visualizations"
          aria-label="Github"
        >
          <VscGithubAlt size={18} />
        </GitHubLink>
      </Header>
      <Outlet />
    </>
  )
}

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const GitHubLink = styled.a`
  display: flex;
  color: rgba(255, 255, 255, 0.87);
  opacity: 0.7;

  &:hover {
    color: rgba(255, 255, 255, 0.87);
    opacity: 1;
  }
`

export default App
