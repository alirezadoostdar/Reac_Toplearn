import { useState } from "react"
import { v4 as uuid } from "uuid"

function ScoreKeeper({ numPlayer, target }) {
    const [scores, SetScores] = useState(new Array(numPlayer).fill(0))
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
            <ul>
                {scores.map((p, i) => {
                    return (
                        <li>
                            Player{i}:{p}
                            <button>+1</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default ScoreKeeper