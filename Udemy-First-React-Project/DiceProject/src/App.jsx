import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Die from './Die'
import Dice from './Dice'
import LuckyN from './LuckyN'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <LuckyN numDice={2} goal={7} />
    </>
  )
}

export default App
