import { useState, useCallback, useEffect } from 'react'
import LocalStorageService from '../../services/localStorageService/local.storage.service'

export const useAuth = () => {
   const [token, setToken] = useState(null)
   const [ready, setReady] = useState(false)
   const [userId, setUserId] = useState(null)

   const login = useCallback((jwtToken, id) => {
      setToken(jwtToken)
      setUserId(id)
      LocalStorageService.setUser({ userId: id, token: jwtToken })
   }, [])

   const logout = useCallback(() => {
      setToken(null)
      setUserId(null)
      localStorage.removeItem('userLogin')
   }, [])

   useEffect(() => {
      const data = LocalStorageService.getUser()

      if (data && data.token) {
         login(data.token, data.userId)
      }
      setReady(true)
   }, [login])

   return { login, logout, token, userId, ready }
}
