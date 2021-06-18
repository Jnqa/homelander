import React from 'react'
import omenLogo from "../images/omen-logo.jpg"


export const AuthPage = () => {
    return (
        <div className="row">
            <h1>Homelander</h1>
        <div className="col s12 m4">
          <div className="card  light-blue darken-3">
            <div className="card-image">
              <img src={omenLogo} className="logo" alt="Omen logo" />
              <span className="card-title">Omen</span>
            </div>
            <div className="card-content white-text">
              <p>[info]</p>
            </div>
            <div className="card-action">
                <button className="btn grey darken-3" >Регистрация</button>
                <button className="btn green darken-2" style={{float: 'right'}} >Вход</button>
            </div>
          </div>
        </div>
      </div>
    )
}