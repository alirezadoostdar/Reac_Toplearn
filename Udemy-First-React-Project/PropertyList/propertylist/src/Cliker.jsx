function HandleClick() {
    console.log("some one click ne")
}

function Cliker() {
    return (
        <div>
            <p>click me bitte</p>
            <button onClick={HandleClick}>click me</button>
        </div>
    )
}

export default Cliker