import { useState } from "react"

function Counter() {
    const [num, setNum] = useState(0)
    const setCount = () => {
        setNum(num + 1)
    }
    return (
        <div>
            <p>the Counter is : {num}</p>
            <button onClick={() => setNum(num + 1)}>add more</button>
        </div>
    )
}

export default Counter