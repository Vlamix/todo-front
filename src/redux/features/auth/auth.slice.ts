import { createSlice, Dispatch } from '@reduxjs/toolkit'
import ApiAuthServices from '../../../services/api/api.auth.services'
import LocalStorageService from '../../../services/localStorageService/local.storage.service'

export interface RegisterData {
   email: string
   password: string
   name: string
}

export interface LoginData {
   email: string
   password: string
}

interface AuthState {
   user?: any
   token?: string | null
   error?: Error
   isLoading: boolean
   note: string | null
}

const IS_SERVER = typeof window === 'undefined'

const initialState: AuthState = {
   isLoading: false,
   token: !IS_SERVER ? localStorage.getItem('token') : '',
   note: null,
}

export const AuthSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state: AuthState) => {
         LocalStorageService.deleteToken()
         state.isLoading = false
         state.token = null
      },
      loginSuccess: (state: AuthState, action) => {
         LocalStorageService.setToken(action.payload)
         state.isLoading = false
         state.token = action.payload
      },
      setNotification: (state: AuthState, action) => {
         state.note = action.payload
      },
      clearNotification: (state: AuthState) => {
         state.note = null
      },
      registerError: (state: AuthState, action) => {
         state.error = action.payload
      },
   },
})

export const { logout, loginSuccess, setNotification, registerError } =
   AuthSlice.actions

export const logoutUser = () => {
   return (dispatch: Dispatch) => {
      dispatch(logout())
   }
}

export const loginUser = (data: LoginData) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await ApiAuthServices.getLogin(data)
         if (res === undefined) {
            dispatch(logout())
            dispatch(setNotification('Incorrect data'))
            dispatch(registerError('Error'))
         } else {
            dispatch(loginSuccess(res))
         }
      } catch (e) {}
   }
}

export const registerUser = (data: RegisterData) => {
   return async (dispatch: Dispatch) => {
      try {
         const res = await ApiAuthServices.getRegistration(data)
         console.log(res)
         if (res === undefined) {
            dispatch(logout())
            dispatch(registerError('Error'))
         } else {
            dispatch(loginSuccess(res))
         }
      } catch (e: any) {}
   }
}

export default AuthSlice.reducer
