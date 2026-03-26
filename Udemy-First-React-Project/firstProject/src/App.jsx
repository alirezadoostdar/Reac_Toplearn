import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Greeter from "./Greeter"
import './App.css'
import ListPicker from './ListPicker'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>test</h1>
      <Greeter person="Alireza" />
      <Greeter person="Pegah" />
      <ListPicker values={[1, 4, 3, 5]} />
    </>

  )
}

export default App
