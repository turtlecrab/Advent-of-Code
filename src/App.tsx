import { Link, Outlet } from 'react-router-dom'

function App() {
  return (
    <>
      <Link to="/">Home</Link>

      <Outlet />
    </>
  )
}

export default App
