import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AuthPage from '../pages/Auth/AuthPage'
import TodoPage from '../pages/TodoPage/TodoPage'

export const useRoutes = (isAuthenticated: boolean) => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/todo" exact>
               <TodoPage />
            </Route>
            <Redirect to="/todo" />
         </Switch>
      )
   }

   return (
      <Switch>
         <Route path="/auth" exact>
            <AuthPage />
         </Route>
         <Redirect to="/auth" />
      </Switch>
   )
}
