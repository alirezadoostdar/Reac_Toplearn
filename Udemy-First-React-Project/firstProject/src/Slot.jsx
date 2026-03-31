function Slot({ val1, val2, val3 }) {
    const result = (val1 === val2 === val3)

    return (
        <div>
            {result ? <h1 style={{ color: "red" }}>You Win</h1> : <h2 style={{ color: "res" }}>You lose</h2>}
        </div>
    )
}

export default Slot