import React, { useEffect, useState } from 'react'
import {useHttp} from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

// function DropLog() {
//     useTvar( () => {
//         console.log('TvarLog',testvar)
//     }, [testvar])
// }


export const AuthPage = () => {
    const message = useMessage()
    const {loading, request} = useHttp()
    const [form, setForm] = useState({
        email:'', password:''
    })

    // useEffect( () => {
    //     console.log('Error:', error)
    //     message(error)
    //     clearError()
    // }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('api/auth/register', 'POST',{...form})
            console.log('Data', data)
        } catch (e) {
            
        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Homelander</h1>
                <div className="card light-blue darken-2">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>

                            <div className="input-field">
                                <input 
                                    placeholder="Input Email" 
                                    id="email" 
                                    type="text"
                                    name="enail"
                                    className="blue-input"
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Password" 
                                    id="password" 
                                    type="password"
                                    name="password"
                                    className="blue-input"
                                    onChange={changeHandler}
                                />
                                    <label htmlFor="password">Password</label>
                            </div>

                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn green accent-4" 
                            style={{marginRight:20}}
                            disabled={loading}
                        >
                            <b>Войти</b>
                        </button>
                        <button 
                            className="btn light-blue lighten-2 white-text"
                            onClick={registerHandler}
                            disabled={loading}
                        >
                            <b>Регистрация</b>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}