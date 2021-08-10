import { RootTodoState } from '../../index'

export const selectTodos = (state: RootTodoState) => state.todos.todos
