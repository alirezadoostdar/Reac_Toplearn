function HandleClick(msg) {
    alert(msg);
}

function Cliker({ message, buttonText }) {

    return (
        <div>
            <button onClick={HandleClick(message)}>{buttonText}</button>
        </div>
    )
}

export default Cliker