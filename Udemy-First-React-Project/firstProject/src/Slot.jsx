function Slot({ val1, val2, val3 }) {

    const result = val1 === val2 && val1 === val3
    console.log(result)
    return (
        <div>
            <h1>{val1}{val2}{val3}</h1>
            <h2 style={{ color: result ? "green" : "red" }}>{result ? "You Win" : "You lose"}</h2>

        </div>
    )
}

export default Slot