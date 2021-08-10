import { Todo } from '../../redux/todos.type'
import { Auth } from '../../redux/auth.types'

class LocalStorageService {
   static getTodos() {
      return JSON.parse(localStorage.getItem('todos') || '[]')
   }

   static setTodos(todos: Todo[]) {
      let todosLocal = JSON.stringify(todos)
      localStorage.setItem('todos', todosLocal)
   }

   static getAuth() {
      return JSON.parse(localStorage.getItem('userLogin') || '[]')
   }

   static setAuth(auth: Auth[]) {
      let userLocal = JSON.stringify(auth)
      localStorage.setItem('userLogin', userLocal)
   }
}

export default LocalStorageService
