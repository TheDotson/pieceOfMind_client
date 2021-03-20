import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = props => {
  const [user, setUser] = useState({
    email:"",
    password:""
  })

  const handleControlledInputChange = (event) => {
    const newUserState = Object.assign({}, user)
    newUserState[event.target.id] = event.target.value
    setUser(newUserState)
  }

  const handleLogin = (e) => {
    e.preventDefault();
    return fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: user.email,
        password: user.password
      })
    })
      .then(res => res.json())
      .then(res => {
        if ("valid" in res && res.valid && "token" in res) {
          localStorage.setItem("token", res.token)
          localStorage.setItem("user_id", res.id)
          props.history.push("/home")
        }
        else {
          props.history.push("/register")
        }
      })
  }

  return (
    <div className="loginContainer">
      <div className="headingContainer">
        <h1 className="headingPrimary">Piece of Mind</h1>
      </div>
      <div className="loginForm">
        <form className="form" autoComplete="off">
          <div className="form__group">
            <input id="email" type="email" className="form__input" placeholder="Email Address" onChange={handleControlledInputChange} required></input>
            <label htmlFor="email" className="form__label">Email Address</label>
          </div>
          <div className="form__group">
            <input id="password" type="password" className="form__input" placeholder="Password" onChange={handleControlledInputChange} required></input>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <div className="form-group">
          <Link to="#" onClick={handleLogin} buttonvariant="link" id="btn-text2">Login</Link>
          </div>
          <div className="form-group">
          <Link className="registerLink" to="/register" buttonvariant="link" id="btn-text2">Not a member yet?</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
