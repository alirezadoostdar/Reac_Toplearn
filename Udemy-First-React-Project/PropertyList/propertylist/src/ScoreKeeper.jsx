import { useState } from "react"
import { v4 as uuid } from "uuid"

function ScoreKeeper({ numPlayer, target }) {
    const [scores, SetScores] = useState(new Array(numPlayer).fill(0))

    function increaseScore(i) {
        SetScores((oldScore) => {
            return oldScore.map((p, idx) => {
                if (idx === i) return p + 1
                return p
            })
        })
    }

    const reset = () => {
        SetScores(new Array(numPlayer).fill(0))
    }
    return (
        <div>
            <h1>Score Keeper</h1>
            <ul>
                {scores.map((p, i) => {
                    return (
                        <li>
                            Player{i}:{p}
                            <button onClick={() => increaseScore(i)}>+1</button>
                            {p === target && <p>Winner!!</p>}
                        </li>
                    )
                })}
            </ul>
            <button onClick={reset} >Reset</button>
        </div>
    )
}

export default ScoreKeeper