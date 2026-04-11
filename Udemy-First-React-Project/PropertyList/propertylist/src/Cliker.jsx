function HandleClick() {
    console.log("some one click ne")
}

function HandleOver() {
    console.log("Hoverd")
}

function Cliker() {
    return (
        <div>
            <p onMouseOver={HandleOver}>click me bitte</p>
            <button onClick={HandleClick}>click me</button>
        </div>
    )
}

export default Cliker