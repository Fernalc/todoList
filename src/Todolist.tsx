import React from 'react'
import { FilterValuesType } from './App'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { title } from 'process'
import { Button, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    tasks: TaskType[],
    deleteTask: (id: string, todolistId: string) => void
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    addTask: (taskTitle: string, todolistId: string) => void
    changeTask: (id: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div>
                {props.tasks.map((task) => {
                    const onChangeTitle = (newTitle: string) => {
                        props.changeTaskTitle(task.id, newTitle, props.id)
                    }

                    return <div key={task.id} className={task.isDone ? 'isCompleted' : ''}>
                        <Checkbox checked={task.isDone} onChange={() => props.changeTask(task.id, props.id)} />
                        <EditableSpan title={task.title} onChangeTitle={(onChangeTitle)} />
                        <IconButton onClick={() => { props.deleteTask(task.id, props.id) }}>
                            <DeleteIcon />
                        </IconButton>
                    </div>
                }
                )}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color='inherit'
                    onClick={() => props.changeFilter(props.id, 'all')}>all</Button>
                <Button color='primary' variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={() => props.changeFilter(props.id, 'active')}>active </Button>
                <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={() => props.changeFilter(props.id, 'completed')}>completed</Button>
            </div>
        </div>
    )
}


export default Todolist