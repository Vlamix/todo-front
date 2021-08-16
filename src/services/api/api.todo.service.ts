import axios from 'axios'

class ApiTodoService {
   _Api_URL = 'http://localhost:5000/todo'

   public async createTodo(data: any) {
      return await axios
         .post(`${this._Api_URL}`, data, {
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
         .get(`${this._Api_URL}`, {
            headers: {
               token: JSON.parse(localStorage.getItem('token') || '').token,
            },
         })
         .then((res) => {
            return res.data
         })
   }

   public async delete(id: number) {
      return await axios.delete(`${this._Api_URL}/${id}`).then((res) => {
         return res.data
      })
   }

   public async update(id: number, body: any) {
      console.log(body, 'body')
      return await axios.patch(`${this._Api_URL}/${id}`, body).then((res) => {
         return res.data
      })
   }
}
export default new ApiTodoService()
