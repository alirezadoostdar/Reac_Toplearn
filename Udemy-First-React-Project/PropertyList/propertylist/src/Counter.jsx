function Counter() {
    let num = 0;
    const increse = () => {

        num = num + 1;
        console.log(num)
    }
    return (
        <div>
            <p>the Counter is : {num}</p>
            <button onClick={increse}>add more</button>
        </div>
    )
}

export default Counter