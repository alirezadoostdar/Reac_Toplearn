import { useState } from "react"

function ColorBox() {
    const [color, setColor] = useState("#E53935")
    const changeColor = () => {
        setColor("#CDDC39")
    }
    return (
        <div style={{ backgroundColor: color }}>
            <p onClick={changeColor}> test</p>
        </div>
    )
}

export default ColorBox