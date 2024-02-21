import React, { ChangeEvent } from 'react'
import { FilterValuesType, TasksStateType } from './App'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { title } from 'process'
import { Button, Checkbox } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux'
import { AppRootState } from './state/store'
import { useSelector } from 'react-redux'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'

export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}

type PropsType = {
    id: string
    title: string,
    changeFilter: (todolistId: string, filter: FilterValuesType) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, newTitle: string) => void
}

function Todolist(props: PropsType) {

    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])


    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {

    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }

    let tasksForTodolist = tasks

    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === false)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(task => task.isDone === true)
    }

    return (
        <div>
            <h3><EditableSpan title={props.title} onChangeTitle={changeTodolistTitle} />
                <IconButton onClick={removeTodolist}>
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={(title) => { dispatch(addTaskAC(props.id, title)) }} />
            <div>
                {tasksForTodolist.map((task) => {
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        const newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, props.id))
                    }
                    const onTitleChangeHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(task.id, newTitle, props.id))
                    }

                    return <div key={task.id} className={task.isDone ? 'isCompleted' : ''}>
                        <Checkbox checked={task.isDone} onChange={onChangeHandler} />
                        <EditableSpan title={task.title} onChangeTitle={onTitleChangeHandler} />
                        <IconButton onClick={() => dispatch(removeTaskAC(props.id, task.id))}>
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