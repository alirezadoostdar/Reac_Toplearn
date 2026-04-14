import { useState } from "react"

function Toggler() {
    const [isHappy, setIsHappy] = useState(true)
    const changeIsHappy = () => {
        setIsHappy(!isHappy)
    }
    return <h1 onClick={changeIsHappy}>
        {isHappy ? "😀" : "😊"}
    </h1>
}

export default Toggler