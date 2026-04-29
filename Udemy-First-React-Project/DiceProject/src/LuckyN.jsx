import { useState } from "react"
import Dice from "./Dice"
import Button from "./Button";

function getRolls(n) {
    return Array.from({ length: n }, () => getRandomDice());
}

function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1
}

function LuckyN({ numDice, winCheck }) {
    const [dice, setDice] = useState(getRolls(numDice))
    const result = winCheck(dice)
    console.log(result)
    const reRoll = () => {
        setDice(getRolls(numDice))
    }
    return (
        <main>
            {result && <h3>you win</h3>}
            <Dice dice={dice} />
            <button onClick={reRoll} >Re-roll Dice</button>
            <Button clickFun={reRoll} text={"click me"} />
        </main>
    )
}

export default LuckyN