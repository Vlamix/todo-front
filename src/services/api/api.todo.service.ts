import axios from 'axios'

class ApiTodoService {
   _Api_URL = 'http://localhost:5000/todo'

   public async createTodo(data: any) {
      return await axios
         .post(`http://localhost:5000/todos`, data, {
            headers: {
               token: JSON.parse(localStorage.getItem('token') || '').token,
            },
         })
         .then((res) => {
            return res.data
         })
   }

   public async getAllTodos() {
      return await axios
         .get(`http://localhost:5000/todos`, {
            headers: {
               token: JSON.parse(localStorage.getItem('token') || '').token,
            },
         })
         .then((res) => {
            return res.data
         })
   }

   public async delete(id: number) {
      return await axios
         .delete(`http://localhost:5000/todos/${id}`, {
            headers: {
               token: JSON.parse(localStorage.getItem('token') || '').token,
            },
         })
         .then((res) => {
            return res.data
         })
   }

   public async update(id: number, body: any) {
      return await axios
         .patch(`http://localhost:5000/todos/${id}`, body, {
            headers: {
               token: JSON.parse(localStorage.getItem('token') || '').token,
            },
         })
         .then((res) => {
            return res.data
         })
   }
}
export default new ApiTodoService()
