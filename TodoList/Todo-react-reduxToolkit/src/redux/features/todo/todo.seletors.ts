import { RootState } from '../../index'

export const selectTodos = (state: RootState) => state.todos.todos
