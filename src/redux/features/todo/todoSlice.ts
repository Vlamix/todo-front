import { createSlice } from '@reduxjs/toolkit'
import { Todo } from '../../todos.type'
import { TodoState } from './todo.types'
import { addTodoAction } from './todo.actions'
import LocalStorageService from '../../../services/localStorageService/local.storage.service'
const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: LocalStorageService.getTodos(),
   },
   reducers: {
      addTodo: addTodoAction,

      toggleComplete: function (state: TodoState, action) {
         const toggledTodo: Todo | undefined = state.todos.find(
            (todo) => todo.id === action.payload.id
         )
         console.log(toggledTodo)
         if (toggledTodo) {
            toggledTodo.completed = !toggledTodo.completed
         }
         LocalStorageService.setTodos(state.todos)
      },
      removeTodo(state: TodoState, action) {
         state.todos = state.todos.filter((todo) => todo.id !== action.payload)
         LocalStorageService.setTodos(state.todos)
      },
      changeTodo(state: TodoState, action) {
         const newTodo = state.todos.find(
            (todo) => todo.id === action.payload.index
         )
         if (newTodo) {
            newTodo.title = action.payload.changeText
         }
         LocalStorageService.setTodos(state.todos)
      },
   },
})

export const { addTodo, toggleComplete, removeTodo, changeTodo } =
   todoSlice.actions

export default todoSlice.reducer
