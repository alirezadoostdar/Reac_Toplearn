function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1
    const num2 = Math.floor(Math.random() * 3) + 1
    const result = num1 === num2
    const style = { color: result ? "green" : "red" }
    return (
        <div style={style}>
            <h1>result dice</h1>
            {num1 === num2 && <h2>you win!</h2>}
            <p>num1 : {num1}</p>
            <p>num2 : {num2}</p>
        </div>
    );

}

export default DoubleDice