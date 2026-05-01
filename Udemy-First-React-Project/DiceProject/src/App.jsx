import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Die from './Die'
import Dice from './Dice'
import LuckyN from './LuckyN'
import Box from './Box'

function isSame(dice) {
  return dice.every((v) => v === dice[0])
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <LuckyN numDice={2} winCheck={isSame} /> */}
      <Box />
      <Box />
      <Box />
    </>
  )
}

export default App
