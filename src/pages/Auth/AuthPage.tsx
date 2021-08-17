import React, { useState } from 'react'
import { Button, CircularProgress, TextField } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { loginUser, registerUser } from '../../redux/features/auth/auth.slice'

const Auth = () => {
   const [loading, setLoading] = useState(false)
   const dispatch = useDispatch()

   const [emailValue, setEmailValue] = useState('')
   const [passwordValue, setPasswordValue] = useState('')

   const loginHandler = async () => {
      setLoading(true)
      await dispatch(loginUser({ email: emailValue, password: passwordValue }))
      setLoading(false)
   }

   const registerHandler = async () => {
      setLoading(true)
      await dispatch(
         registerUser({ email: emailValue, password: passwordValue })
      )
      setLoading(false)
   }

   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <div className="card white darken-1">
               <div className="card-content white-text">
                  <span className="card-title black-text">Authorisation</span>
                  <div>
                     <div className="field">
                        <TextField
                           id="outlined-basic"
                           label="Email"
                           variant="outlined"
                           value={emailValue}
                           onChange={(event) => {
                              setEmailValue(event.target.value)
                           }}
                           style={{ marginTop: '2%' }}
                        />
                     </div>
                     <div className="input-field">
                        <TextField
                           id="outlined-basic"
                           label="Password"
                           type="password"
                           variant="outlined"
                           value={passwordValue}
                           onChange={(event) => {
                              setPasswordValue(event.target.value)
                           }}
                           style={{ marginTop: '2%' }}
                        />
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  {loading ? (
                     <CircularProgress color={'inherit'} />
                  ) : (
                     <div>
                        <Button onClick={loginHandler} disabled={loading}>
                           Login
                        </Button>
                        <Button onClick={registerHandler} disabled={loading}>
                           Registration
                        </Button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Auth
