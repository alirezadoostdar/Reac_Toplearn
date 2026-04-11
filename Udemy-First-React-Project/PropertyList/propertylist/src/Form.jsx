function handleSubmitForm(evt) {
    evt.preventDefault();
    console.log("submit form");
}

function Form() {
    return (
        <form onSubmit={handleSubmitForm}>
            <button>submit</button>
        </form>
    )
}

export default Form