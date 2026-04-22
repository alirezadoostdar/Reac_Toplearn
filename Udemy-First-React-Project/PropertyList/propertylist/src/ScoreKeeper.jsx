import { useState } from "react"
import { v4 as uuid } from "uuid"

function ScoreKeeper({ numPlayer, target }) {
    const players = new Array[numPlayer]
    const [scores, SetScores] = useState(players)
    function increaseP1Score() {
        SetScores((oldScore) => {
            return { ...oldScore, p1Score: oldScore.p1Score + 1 }
        })
    }
    function increaseP2Score() {
        SetScores((oldScore) => {
            return { ...oldScore, p2Score: oldScore.p2Score + 1 }
        })
    }
    return (
        <div>
            <h2>Player 1 : {scores.p1Score}</h2>
            <h2>Player 2 : {scores.p2Score}</h2>
            <button onClick={increaseP1Score}>+1 Player 1</button>
            <button onClick={increaseP2Score}>+1 Player 2</button>
        </div>
    )
}

export default ScoreKeeper