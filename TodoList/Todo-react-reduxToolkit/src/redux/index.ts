import { combineReducers, configureStore } from '@reduxjs/toolkit'
import todoReducer from './features/todo/todoSlice'
import authReducer from './features/auth/auth.slice'

const rootReducer = combineReducers({
   todos: todoReducer,
   auth: authReducer,
})

const Store = configureStore({
   reducer: rootReducer,
})

export type AppDispatch = typeof Store.dispatch
export type RootState = ReturnType<typeof rootReducer>

export default Store
