import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Greeter from "./Greeter"
import './App.css'
import DoubleDice from './DoubluDice'
import ColorList from './ColorList'
import Slot from './Slot'
import ShoppingList from './ShoppingList'

function App() {
  const items = [
    { title: "book", quantity: 4, price: 230000 },
    { title: "laptop", quantity: 10, price: 230000 },
    { title: "handy", quantity: 0, price: 180000 },
    { title: "book", quantity: 12, price: 230000 },
    { title: "poliwer", quantity: 54, price: 450000 },
  ]


  return (
    <>
      <ShoppingList items={items} />
      <Slot val1={"d"} val2={"f"} val3={"d"} />
      <h1>hello</h1>
      <DoubleDice />
      <DoubleDice />
      <DoubleDice />
      <ColorList colors={["red", "blue", "brown", "green"]} />
    </>

  )
}

export default App
