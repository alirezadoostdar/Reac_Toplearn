import { useState } from "react"

function EmojiClicker() {
    const [emojis, setEmojis] = useState(["😂"])
    const AddEmoji = () => {
        setEmojis([...emojis, ["😘"]])
    }
    return (
        <div>
            {emojis.map((e) => (<span style={{ fontSize: "4rem" }}>{e}</span>))}
            <button onClick={AddEmoji}>Add Emoji</button>
        </div>
    )
}

export default EmojiClicker