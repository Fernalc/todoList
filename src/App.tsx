import React, { useCallback, useReducer, useState } from 'react';
import Todolist, { TaskType } from './Todolist';
import './App.css';
import { AddItemForm } from './AddItemForm';
import { title } from 'process';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from './state/todolists-reducer';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppRootState } from './state/store';
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {

  const dispatch = useDispatch();
  const todolists = useSelector<AppRootState, TodolistType[]>(state => state.todolists)

  const changeTaskStatus = useCallback((taskId: string, newIsDoneValue: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC(taskId, newIsDoneValue, todolistId))
  },[])

  const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
    dispatch(changeTaskTitleAC(taskId, newTitle, todolistId))
  },[])

  const removeTask = useCallback( (todolistId: string, taskId: string) => {
    dispatch(removeTaskAC(todolistId, taskId))
  },[])

  const changeFilter = useCallback((todolistId: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(todolistId, filter))
  }, [])

  const removeTodolist = useCallback((todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatch(action)
  }, [])


  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }, [])

  const changeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistId, newTitle))
  }, [])

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Container fixed>
        <Grid container style={{ padding: '20px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map((tl) => {

              return <Grid item>
                <Paper style={{ padding: '10px' }}>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    changeTaskStatus={changeTaskStatus}
                    changeTaskTitle={changeTaskTitle}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            })
          }
        </Grid>
      </Container>
    </div>
  );
}

export default App;
