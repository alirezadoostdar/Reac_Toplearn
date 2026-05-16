
import List from '@mui/material/List';
import { useState } from 'react';
import TodoItem from './TodoItem';


const initialList = [
    { id: 1, text: "walk the cat", completed: false },
    { id: 2, text: "walk the cat", completed: true },
    { id: 3, text: "walk the cat", completed: false },
    { id: 4, text: "walk the cat", completed: true },
    { id: 5, text: "walk the cat", completed: false },

]

function TodoList() {
    const [todos, setTodos] = useState(initialList);

    const removeTodo = (id) => {
        setTodos((prevTodos) => {
            return prevTodos.filter(t => t.id !== id)
        })
    }
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {todos.map((todo) => {
                return <TodoItem todo={todo} key={todo.id} />;
            })}
        </List>
    )
}

export default TodoList