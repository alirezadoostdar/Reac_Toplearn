import { useState } from "react"
import Dice from "./Dice"

function getRolls(n) {
    return Array.from({ length: n }, () => getRandomDice());
}

function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
}

function LuckyN({ numDice, winCheck }) {
    console.log(getRandomDice())
    const [dice, setDice] = useState(getRolls(numDice))
    const result = winCheck(dice)
    console.log(result)
    return (
        <main>
            <Dice dice={dice} />
            {result && <h1>you win</h1>}
        </main>
    )
}

export default LuckyN