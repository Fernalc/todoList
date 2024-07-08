import React, { ChangeEvent, useCallback } from 'react';
import { EditableSpan } from './EditableSpan';
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { TaskType } from './Todolist';

type TaskPropsType = {
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
    task: TaskType 
    todolistId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue, props.todolistId);
    };
    const onTitleChangeHandler = useCallback((newTitle: string) => {
        props.changeTaskTitle(props.task.id, newTitle, props.todolistId);
    },[props.task.id, props.changeTaskTitle, props.todolistId]);

    return <div key={props.task.id} className={props.task.isDone ? 'isCompleted' : ''}>
        <Checkbox checked={props.task.isDone} onChange={onChangeHandler} />
        <EditableSpan title={props.task.title} onChangeTitle={onTitleChangeHandler} />
        <IconButton onClick={() => { props.removeTask(props.todolistId, props.task.id); }}>
            <DeleteIcon />
        </IconButton>
    </div>;
});

