import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './home/Home';
import Rooms from './rooms/Rooms'
import NewRoom from './rooms/NewRoom'
import EditRoom from './rooms/EditRoom'
import Collections from './collections/Collections'
import EditCollection from './collections/EditCollection'
import NewCollection from './collections/NewCollection'
import SingleCollection from './collections/SingleCollection'
import UserDetails from './pieceUsers/UserDetails'
import EditItem from './items/EditItem'
import NewItem from './items/NewItem'
import ItemsByRoom from './rooms/RoomItems'

export const ApplicationViews = () => {
  return <>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/home' render={props => <Home {...props} />} />
        
        <Route path="/rooms" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <Rooms />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newRoom" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NewRoom />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editRoom/:roomId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditRoom />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        
        <Route path="/collections" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <Collections />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editCollection/:collectionId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditCollection />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newCollection" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NewCollection />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/userDetails/:userId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <UserDetails />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/viewCollection/:collectionId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <SingleCollection />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/editItem/:itemId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditItem />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/newItem" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <NewItem />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/roomItems/:roomId" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <ItemsByRoom />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        </>;
};
