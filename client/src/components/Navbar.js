import React, { useContext } from 'react'
import {NavLink, useHistory} from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")
    }

    return (
        <nav>
        <div class="nav-wrapper blue-grey darken-4" style={{ padding: '0 2rem' }}>
          <span class="brand-logo center">Omen</span>
          <ul id="nav-mobile" class="left hide-on-med-and-down">
            <li><NavLink to="/create">Create</NavLink></li>
            <li><NavLink to="/links">Links</NavLink></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav>
    )
}