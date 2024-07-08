import React, { useCallback } from 'react'
import { FilterValuesType, TasksStateType } from './App'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'
import { EditableSpan } from './EditableSpan'
import { title } from 'process'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useDispatch } from 'react-redux'
import { AppRootState } from './state/store'
import { useSelector } from 'react-redux'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer'
import { Task } from './Task'

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
    changeTaskStatus: (taskId: string, newIsDoneValue: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTask: (todolistId: string, taskId: string) => void
}

const Todolist = React.memo((props: PropsType) => {
    const dispatch = useDispatch();
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])


    const changeTaskStatus = (id: string, isDone: boolean, todolistId: string) => {

    }
    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {

    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.id, props.changeTodolistTitle])

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
            <AddItemForm addItem={useCallback((title) => { dispatch(addTaskAC(props.id, title)) }, [props.id])} />
            <div>
                {
                    tasksForTodolist.map(task => <Task
                        key={task.id}
                        task={task}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                        todolistId={props.id}
                    />
                    )
                }
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'contained' : 'text'} color='inherit'
                    onClick={useCallback(() => props.changeFilter(props.id, 'all'), [props.changeFilter, props.id])}>all</Button>
                <Button color='primary' variant={props.filter === 'active' ? 'contained' : 'text'}
                    onClick={useCallback(() => props.changeFilter(props.id, 'active'), [props.changeFilter, props.id])}>active </Button>
                <Button color='secondary' variant={props.filter === 'completed' ? 'contained' : 'text'}
                    onClick={useCallback(() => props.changeFilter(props.id, 'completed'), [props.changeFilter, props.id])}>completed</Button>
            </div>
        </div>
    )
})

export default Todolist