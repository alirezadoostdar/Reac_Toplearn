import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { Button } from '@mui/material'
import RatingDemo from './RatingDemo'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RatingDemo />
      <Button onClick={() => { alert("test") }}>click me</Button>
    </>
  )
}

export default App
