import { Todo } from '../../redux/todos.type'

class LocalStorageService {
   static getTodos() {
      return JSON.parse(localStorage.getItem('todos') || '[]')
   }

   static setTodos(todos: Todo[]) {
      let todosLocal = JSON.stringify(todos)
      localStorage.setItem('todos', todosLocal)
   }

   static getToken() {
      localStorage.getItem('token')
   }
   static setToken(token: string) {
      console.log(JSON.stringify(token))
      localStorage.setItem('token', JSON.stringify(token))
   }
   static deleteToken() {
      localStorage.removeItem('token')
   }
}

export default LocalStorageService
