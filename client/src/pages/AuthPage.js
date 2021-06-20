import React, {useContext, useEffect, useState} from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import omenLogo from "../images/omen-logo.jpg"


export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '', password:''
    })

    useEffect(()=>{
      message(error)
      clearError()
    }, [error, message, clearError])

    useEffect(() => {
      window.M.updateTextFields()
    }, [])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log = ('Data', data)
            message(data.message)
        } catch(e) {}
    } 

    const loginHandler = async () => {
      try {
          const data = await request('/api/auth/login', 'POST', {...form})
          console.log = ('Data', data)
          auth.login(data.token, data.userId)
      } catch(e) {}
    } 


    return (
        <div className="row">
            <h1>Homelander</h1>
        <div className="col s12 m4">
          <div className="card blue-grey darken-1">
            <div className="card-image">
              <img src={omenLogo} className="logo" alt="Omen logo" />
              <span className="card-title">Omen</span>
            </div>
            <div className="card-content white-text">
              <p>Вход производится через бота</p>
              <div className="input-field">
                <input id="email" type="text" 
                name="email" className="blue-input" onChange={changeHandler}/>
                    <label htmlFor="email">Email:</label>
              </div>
              <div className="input-field">
                <input id="password" type="password" 
                name="password" className="blue-input" onChange={changeHandler}/>
                    <label htmlFor="password">Password:</label>
              </div>
            </div>
            <div className="card-action">
                <button 
                    className="btn blue-grey darken-4" 
                    onClick={registerHandler}
                    disabled={loading}
                >Регистрация</button>
                <button 
                    className="btn light-blue darken-1" 
                    style={{float: 'right'}} 
                    onClick={loginHandler}
                    disabled={loading}
                >Вход</button>
            </div>
          </div>
        </div>
      </div>
    )
}