import { useState } from "react"
import { v4 as uuid } from "uuid"

function ScoreKeeper({ numPlayer, target }) {
    const players = new Array(numPlayer).fill(0)
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
            {scores.map((e) => {
                return (
                    <div>
                        <h2>Player </h2>
                        <button>+1</button>
                    </div>
                )
            })}
        </div>
    )
}

export default ScoreKeeper