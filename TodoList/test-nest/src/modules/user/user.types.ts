import { Todo } from '../todo/todo.entity'

export interface IUser {
  id: number
  email: string
  password: string
  role: string
  created_at: Date
  todos: Todo[]
}
