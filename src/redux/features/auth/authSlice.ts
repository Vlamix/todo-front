import { createSlice } from '@reduxjs/toolkit'
import LocalStorageService from '../../../services/localStorageService/local.storage.service'

const authSlice = createSlice({
   name: 'auth',
   initialState: {
      user: LocalStorageService.getAuth(),
   },
   reducers: {},
})

export default authSlice.reducer
