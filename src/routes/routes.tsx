import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Auth from '../components/auth'
import TodoList from '../components/TodoList'

export const useRoutes = (isAuthenticated: boolean) => {
   if (isAuthenticated) {
      return (
         <Switch>
            <Route path={'/todo'} exact>
               <TodoList />
            </Route>
         </Switch>
      )
   }

   return (
      <Switch>
         <Route path={'/'} exact>
            <Auth />
         </Route>
         <Redirect to={'/'} />
      </Switch>
   )
}
