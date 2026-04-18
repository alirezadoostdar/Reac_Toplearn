import { useState } from "react"

function ColorBox({ defaultColor, colorList }) {
    const [color, setColor] = useState(colorList[defaultColor])
    console.log(colorList[defaultColor])
    const changeColor = () => {
        let rnd = Math.floor(Math.random() * colorList.length)
        setColor(colorList[rnd])
    }
    return (
        <div style={{ backgroundColor: color }}>
            <p onClick={changeColor}></p>
        </div>
    )
}

export default ColorBox