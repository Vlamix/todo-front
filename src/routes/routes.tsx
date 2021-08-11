import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AuthPage from '../pages/Auth/AuthPage'
import TodoList from '../components/TodoList'

export const useRoutes = (isAuthenticated: boolean) => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path="/todo" exact>
               <TodoList />
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
