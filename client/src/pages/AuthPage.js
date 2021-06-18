import React, {useState} from 'react'
import { useHttp } from '../hooks/http.hook'
import omenLogo from "../images/omen-logo.jpg"


export const AuthPage = () => {
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password:''
    })

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log = ('Data', data)

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
                <input placeholder="Input email" id="email" type="text" 
                name="email" className="blue-input" onChange={changeHandler}/>
                    <label htmlFor="email">Email:</label>
              </div>
              <div className="input-field">
                <input placeholder="Input password" id="password" type="password" 
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
                    disabled={loading}
                >Вход</button>
            </div>
          </div>
        </div>
      </div>
    )
}