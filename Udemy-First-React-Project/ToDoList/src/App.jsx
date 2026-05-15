import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import CssBaseline from '@mui/material/CssBaseline'
import './App.css'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <CssBaseline />
      <h1>ToDo List</h1>
      <Todo
    </>
  )
}

export default App
