import { useState } from "react"

function Counter() {
    const [num, setNum] = useState(0)
    console.log("start component")
    console.log(`num:${num}`)
    const setCount = () => {
        setNum(num + 1)
        console.log("execute method")
        console.log(`num:${num}`)
    }
    return (
        <div>
            <p>the Counter is : {num}</p>
            <button onClick={(setCount)}>add more</button>
        </div>
    )
}

export default Counter