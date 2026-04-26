import { useState } from "react"
import Dice from "./Dice"

function getRolls(n) {
    return Array.from({ length: n }, () => getRandomDice());
}

function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
}

function LuckyN({ numDice, goal }) {
    console.log(getRandomDice())
    const [dice, setDice] = useState(getRolls(numDice))
    console.log(dice)
    return (
        <main>
            <Dice dice={dice} />
        </main>
    )
}

export default LuckyN