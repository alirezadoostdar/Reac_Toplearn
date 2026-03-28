function DoubleDice() {
    const num1 = Math.floor(Math.random() * 3) + 1
    const num2 = Math.floor(Math.random() * 3) + 1
    return (
        <div>
            <h1>{num1 === num2 ? "You win!" : "you Lose ;("}</h1>
            <p>num1 : {mum1}</p>
            <p>num2 : {num2}</p>
        </div>
    )

}

export default DoubleDice