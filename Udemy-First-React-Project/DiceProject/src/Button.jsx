import "./Button.css"

function Button({ clickFun, text = "click me" }) {
    return <button className="Button"
        onClick={clickFun}>{text}</button>
}

export default Button