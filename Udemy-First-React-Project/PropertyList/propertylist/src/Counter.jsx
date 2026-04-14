import { useState } from "react"

function Counter() {
    const [num, setNum] = useState
    return (
        <div>
            <p>the Counter is : {num}</p>
            <button onClick={increse}>add more</button>
        </div>
    )
}

export default Counter