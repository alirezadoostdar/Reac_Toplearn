import { useState } from "react"

function UsernameForm() {
    const [userDate, setUserData] = useState(
        {
            firstName: "alireza",
            lastName: "",
            password: ""
        });

    const updateUserName = (evt) => {
        const changeField = evt.target.name;
        console.log(changeField)
        const newValue = evt.target.value;
        console.log(newValue);
        setUserData((curDate) => {
            curDate[changeField] = newValue
            return { ...curDate }
        })
    }
    return (
        <div>
            <label htmlFor="firstname">first Name</label>
            <input
                placeholder="first name"
                value={userDate.firstName}
                name="firstName"
                onChange={updateUserName}
                id="firstname" type="text" />

            <label htmlFor="lastname">Last Name</label>
            <input
                placeholder="last name"
                value={userDate.lastName}
                name="lastName"
                onChange={updateUserName}
                id="lastname" type="text" />

            <label htmlFor="password">Password</label>
            <input
                placeholder="password"
                value={userDate.password}
                name="password"
                onChange={updateUserName}
                id="password" type="password" />
            <button>submit</button>
        </div>
    )
}

export default UsernameForm