import { useState, useEffect } from "react";

function Counter() {
    const [count, setCount] = useState(0)
    const increment = () => {
        setCount((c) => c + 1)
    }
    return (
        <div>
            <h1>{count}</h1>
            <button onClick={increment}>+1</button>
        </div>
    )
}

export default Counter