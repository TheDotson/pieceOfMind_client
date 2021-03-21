import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './home/Home';
import { CollectionProvider } from './collections/CollectionProvider'
import { CollectionsList } from './collections/CollectionsList'
import Rooms from './rooms/Rooms'
import NewRoom from './rooms/NewRoom'
import EditRoom from './rooms/EditRoom'

export const ApplicationViews = () => {
  return <>
        <Route exact path='/'>
          <Redirect to='/home' />
        </Route>
        <Route exact path='/home' render={props => <Home {...props} />} />

        <CollectionProvider>
        <Route
          exact
          path="/collections"
          render={(props) => {
            return <CollectionsList {...props} history={props.history} />;
          }}
        />
        </CollectionProvider>
        
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

        <Route path="/editRoom" render={() => {
            if (localStorage.getItem("token")) {
                return <>
                    <EditRoom />
                    </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        

        </>;
};
