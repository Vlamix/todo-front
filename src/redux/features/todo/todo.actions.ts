import { PayloadAction } from '@reduxjs/toolkit'
import { TodoState } from './todo.types'
import LocalStorageService from '../../../services/localStorageService/local.storage.service'

export const addTodoAction = (
   state: TodoState,
   action: PayloadAction<{ text: string }>
) => {
   state.todos.push({
      title: action.payload.text,
      completed: false,
      id: Date.now().toString(),
   })
   LocalStorageService.setTodos(state.todos)
}
