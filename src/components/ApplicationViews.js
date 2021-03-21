import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Home } from './home/Home';
import { CollectionProvider } from './collections/CollectionProvider'
import { CollectionsList } from './collections/CollectionsList'

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
        </>;
};
