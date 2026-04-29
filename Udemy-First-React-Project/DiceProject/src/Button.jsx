import "./Button.css"

function Button({ clickFun, text }) {
    return <button className="Button"
        onClick={clickFun}>{text}</button>
}

export default Button