import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';


const initialList = [
    { id: 1, text: "walk the cat", completed: false },
    { id: 2, text: "walk the cat", completed: false },
    { id: 3, text: "walk the cat", completed: false },
    { id: 4, text: "walk the cat", completed: false },
    { id: 5, text: "walk the cat", completed: false },

]

function todoList() {
    return (
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
            {initialList.map((todo) => {
                const labelId = `checkbox-list-label-${todo.text}`;

                return (
                    <ListItem
                        key={todo.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                <CommentIcon />
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.includes(todo.completed)}
                                    tabIndex={-1}
                                    disableRipple
                                    slotProps={{ input: { 'aria-labelledby': todo.id } }}
                                />
                            </ListItemIcon>
                            <ListItemText id={todo.id} primary={todo.text} />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    )
}

export default todoList