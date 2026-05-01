import { useState } from "react";
import Box from "./Box";

function BoxGrid({ numBox = 9 }) {
    const [boxes, setBoxes] = useState(Array.from({ length: numBox }, () => { false }))

    const toggle = (idx) => {
        setBoxes((oldBoxes) => {
            return boxes.map((val, i) => {
                if (i === idx) {
                    return !val
                } else {
                    return val
                }
            })
        })
    }

    const reset = () => {
        setBoxes(Array.from({ length: numBox }, () => { false }))
    }
    return (
        <div>
            {boxes.map((b, i) => {
                return <Box key={i} isActive={b} toggleFun={() => { toggle(i) }} />
            })}
            <button onClick={reset}>reset</button>
        </div>
    )
}

export default BoxGrid