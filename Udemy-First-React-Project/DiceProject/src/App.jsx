import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Die from './Die'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Die val={5} />
      <Die val={4} />
    </>
  )
}

export default App
