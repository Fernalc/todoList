import React, { useState } from 'react';
import Todolist, { TaskType } from './Todolist';
import './App.css';
import { v1 } from 'uuid';
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

export type FilterValuesType = 'all' | 'active' | 'completed';

type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TasksStateType = {
  [key: string]: TaskType[]
}

function App() {
  const deleteTask = (id: string, todolistId: string) => {
    const tasks = tasksObj[todolistId]
    const filteredTasks = tasks.filter(task => task.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasksObj({ ...tasksObj })
  }

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    const todolist = todolists.find(tl => tl.id === todolistId)
    if (todolist) {
      todolist.filter = filter
      setTodolists([...todolists])
    }
  }

  const addTask = (taskTitle: string, todolistId: string) => {
    const newTask = {
      id: v1(),
      title: taskTitle,
      isDone: false
    }
    const tasks = tasksObj[todolistId]
    const newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks
    setTasksObj({ ...tasksObj })
  }

  const changeTask = (id: string, todolistId: string) => {
    const tasks = tasksObj[todolistId]
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = !task.isDone
      setTasksObj({ ...tasksObj })
    }

  }

  const todolistId1 = v1();
  const todolistId2 = v1();


  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: "What to learn", filter: "all" },
    { id: todolistId2, title: "What to buy", filter: "all" },
  ])


  const removeTodolist = (todolistId: string) => {
    const newTodolist = todolists.filter(tl => tl.id !== todolistId)
    setTodolists(newTodolist)
    delete tasksObj[todolistId]
    setTasksObj({ ...tasksObj })
  }

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: "CSS", isDone: true },
      { id: v1(), title: "JS", isDone: false },
      { id: v1(), title: "HTML", isDone: true },
      { id: v1(), title: "React", isDone: false }
    ],
    [todolistId2]: [
      { id: v1(), title: "Book", isDone: true },
      { id: v1(), title: "Milk", isDone: false },
    ]
  })

  const addTodolist = (title: string) => {
    const newTodolist: TodolistType = {
      id: v1(),
      title: title,
      filter: "all"
    }
    setTodolists([newTodolist, ...todolists])
    setTasksObj({ ...tasksObj, [newTodolist.id]: [] })
  }

  const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
    const todolist = tasksObj[todolistId]
    const newTask = todolist.find(t => t.id === taskId)
    if (newTask) {
      newTask.title = newTitle
      setTasksObj({ ...tasksObj })
    }

  }

  const changeTodolistTitle = (todolistId: string, newTitle: string) => {
    const todoList = todolists.find(tl => tl.id === todolistId)
    if (todoList) {
      todoList.title = newTitle
      setTodolists([...todolists])
    }
  }

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
        <Grid container style={ {padding: '20px'} }>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={3}>
          {
            todolists.map((tl) => {
              let tasksForTodo = tasksObj[tl.id]

              if (tl.filter === 'active') {
                tasksForTodo = tasksForTodo.filter(task => task.isDone === false)
              }

              if (tl.filter === 'completed') {
                tasksForTodo = tasksForTodo.filter(task => task.isDone === true)
              }
              return <Grid item>
                <Paper style={ {padding: '10px'} }>
                  <Todolist
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={tasksForTodo}
                    deleteTask={deleteTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTask={changeTask}
                    filter={tl.filter}
                    removeTodolist={removeTodolist}
                    changeTaskTitle={changeTaskTitle}
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
