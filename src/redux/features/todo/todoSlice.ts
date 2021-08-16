import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { TodoState } from './todo.types'
import ApiTodoService from '../../../services/api/api.todo.service'
import { AppDispatch } from '../../index'
import { Todo } from '../../todos.type'

const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [],
   },
   reducers: {
      addTodo(state: TodoState, action) {
         state.todos.push(action.payload)
      },
      getAllTodos(state: TodoState, action) {
         state.todos = action.payload
      },
      removeTodo(state: TodoState, action) {
         console.log(action.payload)
         state.todos.splice(action.payload, 1)
      },
      successToggle(state: TodoState, action) {
         state.todos[action.payload.index].isChecked = action.payload.isChecked
      },
      successChange(state: TodoState, action) {
         let changeTodo: Todo | undefined = state.todos.find(
            (value) => value.id === action.payload.index
         )
         if (changeTodo) {
            changeTodo.title = action.payload.title
         }
      },
   },
})

export const {
   addTodo,
   removeTodo,
   successToggle,
   getAllTodos,
   successChange,
} = todoSlice.actions

export default todoSlice.reducer

export const addTodos = (data: { title: string; token: string }) => {
   return async (dispatch: Dispatch): Promise<void> => {
      try {
         const res = await ApiTodoService.createTodo(data)
         console.log(res)
         if (res === undefined) {
            console.log('some error')
         } else {
            dispatch(addTodo(res))
         }
      } catch (e: any) {}
   }
}

export const removeTodos = (id: number, index: number) => {
   return async (dispatch: Dispatch): Promise<void> => {
      try {
         const res = await ApiTodoService.delete(id)
         if (res === undefined) {
            console.log('some error')
         } else {
            dispatch(removeTodo(index))
         }
      } catch (e) {}
   }
}

export const getAll = () => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await ApiTodoService.getAllTodos()
         if (res === undefined) {
            console.log('some error')
         } else {
            dispatch(getAllTodos(res))
         }
      } catch (e) {}
   }
}

export const changeOneTodo = (index: number, body: { title: string }) => {
   return async (dispatch: Dispatch) => {
      try {
         await ApiTodoService.update(index, body)
         dispatch(successChange({ index, title: body.title }))
      } catch (e) {}
   }
}

export const changeToggleTodo = (
   index: number,
   body: { isChecked: boolean },
   id: number
) => {
   return async (dispatch: Dispatch) => {
      try {
         await ApiTodoService.update(id, body)
         dispatch(successToggle({ index, isChecked: body.isChecked }))
      } catch (e) {}
   }
}
