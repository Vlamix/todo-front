import axios from 'axios'

class ApiAuthServices {
   _Api_URL = 'http://localhost:5000/auth'

   public async getLogin(body: { email: string; password: string }) {
      return axios.post(`${this._Api_URL}/login`, body).then((res) => {
         const token = res.data.token
         localStorage.setItem('token', token)
         return res.data
      })
   }

   public async getRegistration(body: {
      email: string
      password: string
      name: string
   }) {
      return await axios.post(`${this._Api_URL}/register`, body).then((res) => {
         return res.data
      })
   }
}
export default new ApiAuthServices()
