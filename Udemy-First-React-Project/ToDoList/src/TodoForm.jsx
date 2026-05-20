import { Create } from "@mui/icons-material"
import { IconButton, InputAdornment, ListItem, TextField } from "@mui/material"
import { useState } from "react"

function TodoForm({ addTodo }) {
    const [text, setText] = useState("")
    const handleChange = (e) => {
        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addTodo(text)
        setText("")
    }

    return (
        <ListItem>
            <form onSubmit={handleSubmit}>
                <TextField
                    id="outlined-Basic"
                    label="Outlined"
                    variant="outlined"
                    onChange={handleChange}
                    value={text}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton aria-label="toggle password visibility" edge="end" type="submit">
                                    <Create />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </ListItem >
    )
}

export default TodoForm