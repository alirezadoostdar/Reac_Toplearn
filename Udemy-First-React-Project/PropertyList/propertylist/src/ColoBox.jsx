import { useState } from "react"
import "./ColorBox.css"

function RandomColor(colors) {
    let rnd = Math.floor(Math.random() * colors.length);
    console.log(rnd)
    console.log(colors[rnd])
    return colors[rnd]
}


function ColorBox({ colorList }) {
    const [color, setColor] = useState(RandomColor(colorList))
    const changeColor = () => {
        setColor(RandomColor(colorList))
    }
    return (
        <div className="Colorbox"
            onClick={changeColor}
            style={{ backgroundColor: color }}>

        </div>
    )


}

export default ColorBox