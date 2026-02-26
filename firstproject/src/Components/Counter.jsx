const Counter = (props) => {
    console.log(props)
    return (
        <div>
            <p> Counter : {props.count}</p>
        </div>
    )
}

export default Counter;