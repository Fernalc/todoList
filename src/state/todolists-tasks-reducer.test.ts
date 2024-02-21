import { TasksStateType, TodolistType } from "../App"
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: TodolistType[] = [];

    const action = addTodolistAC('new todolist');

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTask = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTask).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId)
})