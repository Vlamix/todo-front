import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { TodoState } from './todo.types'
import ApiTodoService from '../../../services/api/api.todo.service'
import { Todo } from '../../todos.type'
import { AddDto, ChangeDto, RemoveDto, ToggleDto } from './dto/todo.dto'

const todoSlice = createSlice({
   name: 'todos',
   initialState: {
      todos: [],
   },
   reducers: {
      addTodoSuccess(state: TodoState, action) {
         state.todos.push(action.payload.res.todo)
      },
      getAllSuccess(state: TodoState, action) {
         state.todos = action.payload.res.todos
      },
      removeTodoSuccess(state: TodoState, action) {
         console.log(action.payload)
         state.todos.splice(action.payload, 1)
      },
      successToggle(state: TodoState, action) {
         state.todos[action.payload.index].isCompleted =
            action.payload.isCompleted
         // console.log(state.todos[action.payload.index])
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
   addTodoSuccess,
   removeTodoSuccess,
   successToggle,
   getAllSuccess,
   successChange,
} = todoSlice.actions

export default todoSlice.reducer

export const addTodo = (data: AddDto) => {
   return async (dispatch: Dispatch): Promise<void> => {
      try {
         const res = await ApiTodoService.createTodo({
            title: data.title,
            description: 'some',
            isCompleted: false,
         })
         console.log(res)
         if (res === undefined) {
            console.log('some error')
         } else {
            dispatch(addTodoSuccess({ res: res }))
         }
      } catch (e: any) {}
   }
}

export const removeTodo = (data: RemoveDto) => {
   return async (dispatch: Dispatch): Promise<void> => {
      try {
         await ApiTodoService.delete(data.id)
         dispatch(removeTodoSuccess({ index: data.index }))
      } catch (e) {}
   }
}

export const getAll = () => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await ApiTodoService.getAllTodos()
         console.log(res)
         if (res === undefined) {
            console.log('some error')
         } else {
            dispatch(getAllSuccess({ res: res }))
         }
      } catch (e) {}
   }
}

export const changeTodo = (data: ChangeDto) => {
   return async (dispatch: Dispatch) => {
      try {
         console.log(data.index, ' ', data.body)

         await ApiTodoService.update(data.index, data.body)
         dispatch(successChange({ index: data.index, title: data.body.title }))
      } catch (e) {}
   }
}

export const changeToggleTodo = (data: ToggleDto) => {
   return async (dispatch: Dispatch) => {
      try {
         console.log(data.id, ' ', data.body)
         await ApiTodoService.update(data.id, data.body)
         dispatch(
            successToggle({
               index: data.index,
               isCompleted: data.body.isCompleted,
            })
         )
      } catch (e) {
         console.log(e)
      }
   }
}
