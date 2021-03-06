import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { ApplicationViews } from './ApplicationViews';
import { Login } from './auth/Login';
import { Register } from './auth/Register';
import { NavBar } from './navbar/NavBar'

export const PieceOfMind = () => (
    <>
        <Route render={() => {
          if (localStorage.getItem('token')) {
            return <>
                    <Route component={NavBar} />
                    <Route render={props => <ApplicationViews {...props} />} />
                </>;
          }
          return <Redirect to="/login" />;
        }} />

        <Route path="/login" render={props => <Login {...props}/>} />
        <Route path="/register" render={props => <Register {...props}/>} />
    </>
);
