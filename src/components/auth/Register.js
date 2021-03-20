import React, { useState } from "react"
import { Link } from 'react-router-dom'

export const Register = props => {
  const first_name = React.createRef()
  const last_name = React.createRef()
  const email = React.createRef()
  const password = React.createRef()
  const verifyPassword = React.createRef()
  const passwordDialog = React.createRef()
  const bio = React.createRef()

  const handleRegister = (e) => {
    e.preventDefault();

    if (password.current.value === verifyPassword.current.value) {
        const newUser = {
            "username": email.current.value,
            "first_name": first_name.current.value,
            "last_name": last_name.current.value,
            "email": email.current.value,
            "password": password.current.value,
            "bio": bio.current.value,
            "photo": null
        }

        return fetch("http://127.0.0.1:8000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(newUser).replace(/:[ ]*"false"/,':false' ).replace( /'/g,'"')
        })
            .then(res => res.json())
            .then(res => {
                if ("token" in res) {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("user_id", res.id)
                    props.history.push("/home")
                }
            })
    } else {
        passwordDialog.current.showModal()
    }
}

  return (
<>
    <dialog className="dialog dialog--password" ref={passwordDialog}>
    <div>Passwords do not match</div>
    <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
</dialog>

    <div className="loginContainer">
      <div className="headingContainer">
        <h1 className="headingPrimary">Piece of Mind</h1>
      </div>
      <div className="loginForm">
        <form className="form" autoComplete="off" >
          <div className="form__group">
            <input ref={first_name} id="first_name" type="text" className="form__input" placeholder="First Name" required></input>
            <label htmlFor="first_name" className="form__label">First Name</label>
          </div>
          <div className="form__group">
            <input ref={last_name} id="last_name" type="text" className="form__input" placeholder="Last Name" required></input>
            <label htmlFor="last_name" className="form__label">Last Name</label>
          </div>
          <div className="form__group">
            <input ref={email} id="email" type="email" className="form__input" placeholder="Email Address" required></input>
            <label htmlFor="email" className="form__label">Email Address</label>
          </div>
          <div className="form__group">
            <input ref={bio} id="bio" type="text" className="form__input" placeholder="Bio" required></input>
            <label htmlFor="bio" className="form__label">Bio</label>
          </div>
          <div className="form__group">
            <input ref={password} id="password" type="password" className="form__input" placeholder="Password" required></input>
            <label htmlFor="password" className="form__label">Password</label>
          </div>
          <div className="form__group">
            <input ref={verifyPassword} id="verifyPassword" type="password" className="form__input" placeholder="Confirm Password" required></input>
            <label htmlFor="password" className="form__label">Verify Password</label>
          </div>
          <Link buttonvariant="link" id="btn-text2" onClick={handleRegister} to="#">Register</Link>
        </form>
      </div>
    </div>
    </>
  )
} 
