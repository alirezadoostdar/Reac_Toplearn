function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1
    const num2 = Math.floor(Math.random() * 3) + 1
    return (
        <div>
            <h1>result dice</h1>
            {num1 === num2 && <h2>you win!</h2>}
            <p>num1 : {num1}</p>
            <p>num2 : {num2}</p>
        </div>
    );

}

export default DoubleDice