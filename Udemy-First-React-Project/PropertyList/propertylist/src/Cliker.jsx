function HandleClick(msg) {
    alert(msg);
}

function Cliker({ message, buttonText }) {
    const show = () => {
        alert(message)
    }
    return (
        <div>
            <button onClick={() => { alert(message) }}>{buttonText}</button>
            <button onClick={show} style={{ backgroundColor: "green" }}>{buttonText}</button>
        </div>
    )
}

export default Cliker