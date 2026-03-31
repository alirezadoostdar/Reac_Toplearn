import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Greeter from "./Greeter"
import './App.css'
import DoubleDice from './DoubluDice'
import ColorList from './ColorList'

function App() {


  return (
    <>
      <h1>hello</h1>
      <DoubleDice />
      <DoubleDice />
      <DoubleDice />
      <ColorList colors={["red", "blue", "brown", "green"]} />
    </>

  )
}

export default App
