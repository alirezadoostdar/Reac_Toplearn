import { useState } from "react"
import "./Toggler.css"

function Toggler() {
    const [isHappy, setIsHappy] = useState(true)
    const changeIsHappy = () => {
        setIsHappy(!isHappy)
    }
    return <h1 className="toggler" onClick={changeIsHappy}>
        {isHappy ? "😀" : "😊"}
    </h1>
}

export default Toggler