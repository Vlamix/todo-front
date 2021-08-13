import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { Todo } from '../../todos.type'
import { TodoState } from './todo.types'
import LocalStorageService from '../../../services/localStorageService/local.storage.service'
import ApiTodoService from '../../../services/api/api.todo.service'
import { registerError } from '../auth/auth.slice'

const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [],
   },
   reducers: {
      //addTodo: addTodoAction,
      addTodo(state: TodoState, action) {
         state.todos.push(action.payload)
      },
      toggleComplete(state: TodoState, action) {
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

export const addTodos = (data: { title: string; token: string }) => {
   return async (dispatch: Dispatch): Promise<void> => {
      try {
         const res = await ApiTodoService.createTodo(data)
         console.log(res)
         if (res === undefined) {
            dispatch(registerError('Error'))
         } else {
            dispatch(addTodo(res))
         }
      } catch (e: any) {}
   }
}
