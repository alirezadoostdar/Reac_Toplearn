function Counter() {
    const increse = () => {
        let num = 0;
        console.log(num)
    }
    return (
        <div>
            <p>the Counter is : { }</p>
            <button onClick={increse}>add more</button>
        </div>
    )
}

export default Counter