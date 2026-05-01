import { useState } from "react"
import "./Box.css"

function Box({ isActive = false, toggleFun }) {

    return <div className="Box"
        onClick={toggleFun}
        style={{ backgroundColor: isActive ? "red" : "black" }}></div>
}

export default Box