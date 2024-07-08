import { Button, IconButton } from '@mui/material';
import React, { KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import { ControlPoint } from '@mui/icons-material';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const [taskTitle, setTaskTitle] = useState('');
    const [error, setError] = useState('');

    const addTask = () => {
        if (taskTitle.trim() !== '') {
            props.addItem(taskTitle.trim());
            setTaskTitle('');
        }
        else setError('Field is required');
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== '') {
            setError('');
        }
        if (e.key === 'Enter') {
            addTask();
        }
    };

    return <div>
        <TextField
            variant='standard'
            label="title"
            value={taskTitle}
            onChange={e => setTaskTitle(e.currentTarget.value)}
            onKeyDown={onKeyPressHandler}
            error={!!error}
            helperText={error} />
        <IconButton onClick={addTask} color='primary'>
            <ControlPoint />
        </IconButton>

    </div>;
});
