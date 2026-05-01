import { useState } from "react"
import "./Box.css"

function Box() {
    const [isActive, setIsActive] = useState(false)
    const toggleIsActive = () => {
        setIsActive(!isActive)
    }
    return <div className="Box"
        onClick={toggleIsActive}
        style={{ backgroundColor: isActive ? "red" : "black" }}></div>
}

export default Box