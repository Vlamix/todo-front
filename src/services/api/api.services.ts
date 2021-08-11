import axios from 'axios'

class ApiServices {
   static getLogin(form: { email: string; password: string }) {
      throw new Error('Method not implemented.')
   }
   _Api_URL = 'http://localhost:5000'

   public async getLogin(body: {
      email: string
      password: string
   }){
      return axios.post(`${this._Api_URL}/auth/login`, body).then((res) => {

         const token = res.data.token
         localStorage.setItem('token', token)
         return res.data
      })
   }

   public async getRegistration(body: {
      email: string
      password: string
   }): Promise<string> {
      return await axios
         .post(`${this._Api_URL}/auth/registration`, body)
         .then((res) => {
            return res.data
         })
   }

   public async loadTodo(isLoad: boolean): Promise<boolean> {
      return isLoad
   }
}
export default new ApiServices()
