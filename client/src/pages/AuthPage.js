import React, { useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'

export const AuthPage = () => {
    const {loading, error, request} = useHttp()
    const [form, setForm] = useState({
        email: '', password: '' 
    })

    const changeHandler = event => {
        setForm({ ...form,   [event.target.name]: event.target.value })
    }

    const registerHandler = async() => {
        try {
            const data = await request('/api/auth/register', 'POST')
        } catch (e) { }
    }

    return (
        <div className='row'>
            <div className='col s4 offset-s3'>
                <h1>Homelander</h1>
                <div className="card blue-grey darken-1">
                <div className="card-content white-text">
                    <span className="card-title">Авторизация</span>
                    <p>Ты можешь!</p>
                    <div>

                        <div className="input-field">
                            <input 
                                placeholder=""
                                id="email" 
                                type="email"
                                name="email"
                                className='yellow-input'
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="input-field">
                            <input 
                                placeholder=""
                                id="password" 
                                type="password"
                                name="password"
                                className='yellow-input'
                                onChange={changeHandler}
                            />
                            <label htmlFor="email">Пароль</label>
                        </div>
                    </div>
                </div>
                    <div className="card-action">
                        <button className='btn light-blue darken-1' style = {{ marginRight: 10}}>Вход</button>
                        <button className='btn green darken-1'>Регистрация</button>
                    </div>
                </div>
            </div>
        </div>
    )
}