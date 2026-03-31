function Slot({ val1, val2, val3 }) {

    const result = val1 === val2
    console.log(result)
    return (
        <div>
            {result && <h1 style={{ color: "red" }}>You Win</h1>}
        </div>
    )
}

export default Slot