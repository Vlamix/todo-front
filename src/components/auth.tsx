import React, { useContext, useState } from 'react'
import { CircularProgress } from '@material-ui/core'
import LocalStorageService from '../services/localStorageService/local.storage.service'
import { useDispatch } from 'react-redux'

const Auth = () => {
   const [form, setForm] = useState({
      email: '',
      password: '',
   })
   const [loading, setLoading] = useState(false)
   const dispatch = useDispatch()
   const changeHandler = (event: any) => {
      setForm({ ...form, [event.target.name]: event.target.value })
   }

   const loginHandler = async () => {
      setLoading(true)
      dispatch(loginUser(form))
      setLoading(false)
   }

   const registerHandler = async () => {
      setLoading(true)
      dispatch(registerUser(form))
      setLoading(false)
   }

   return (
      <div className="row">
         <div className="col s6 offset-s3">
            <div className="card blue darken-1">
               <div className="card-content white-text">
                  <span className="card-title">Authorisation</span>
                  <div>
                     <div className="input-field">
                        <input
                           placeholder={'Email'}
                           type="text"
                           id="email"
                           name="email"
                           className="yellow-input"
                           value={form.email}
                           onChange={changeHandler}
                        />
                     </div>
                     <div className="input-field">
                        <input
                           placeholder={'Password'}
                           type="password"
                           id="password"
                           name="password"
                           className="yellow-input"
                           value={form.password}
                           onChange={changeHandler}
                        />
                     </div>
                  </div>
               </div>
               <div className="card-action">
                  {loading ? (
                     <CircularProgress color={'inherit'} />
                  ) : (
                     <div>
                        <button
                           className="btn yellow darken-4"
                           onClick={loginHandler}
                        >
                           Login
                        </button>
                        <button
                           className="btn grey lighten-1 black-text"
                           onClick={registerHandler}
                           disabled={loading}
                        >
                           Registration
                        </button>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default Auth
