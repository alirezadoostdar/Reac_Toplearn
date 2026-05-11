import { useState, useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0)
    const [name, setName] = useState("")
    const increment = () => {
        setCount((c) => c + 1)
    }

    const handleSetName = (e) => {
        setName(e.target.value)
    }
    useEffect(function myEffect() {
        console.log("my effect runes")
    })
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
            <input value={name} onChange={handleSetName} type="text" />
        </div>
    )
}

export default Counter