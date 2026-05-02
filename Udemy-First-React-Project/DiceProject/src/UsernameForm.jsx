import { useState } from "react"

function UsernameForm() {
    const [userName, setUserName] = useState("")
    const updateUserName = (evt) => {
        setUserName(evt.target.value)
    }
    return (
        <div>
            <label htmlFor="username">User Name</label>
            <input
                placeholder="Username"
                value={userName}
                onChange={updateUserName}
                id="username" type="text" />
            <button>submit</button>
        </div>
    )
}

export default UsernameForm