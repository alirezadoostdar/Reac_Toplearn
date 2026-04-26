import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Die from './Die'
import Dice from './Dice'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Dice dice={[4, 2, 6, 6]} />
    </>
  )
}

export default App
