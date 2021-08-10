import { PayloadAction } from '@reduxjs/toolkit'
import LocalStorageService from '../../../services/localStorageService/local.storage.service'
import { AuthState } from './auth.types'

export const addAuthAction = (
   state: AuthState,
   action: PayloadAction<{ email: string; password: string }>
) => {
   state.auth.push({
      email: action.payload.email,
      password: action.payload.password,
      id: Date.now(),
   })
   LocalStorageService.setAuth(state.auth)
}
