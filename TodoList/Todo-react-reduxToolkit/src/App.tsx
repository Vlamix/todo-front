import React from 'react'
import './App.css'

import { useRoutes } from './routes/routes'
import { BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from './redux'

const App = () => {
   const token = useSelector((state: RootState) => state.auth.token)
   console.log(token)
   const routes = useRoutes(!!token)
   return (
      <BrowserRouter>
         <div className="App">{routes}</div>
      </BrowserRouter>
   )
}

export default App
