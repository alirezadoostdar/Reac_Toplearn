import "./Button.css"

function Button({ clickFun }) {
    return <button className="Button"
        onClick={clickFun}>Click me</button>
}

export default Button