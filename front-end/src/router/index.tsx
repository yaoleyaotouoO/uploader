import React from 'react';
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';
import {
  Dashboard, Gallery, Layout, Combine
} from '@containers/index';

const NoMatch = () => {
  return <Redirect to='/gallery' />;
};

const Router = () => {
  return <HashRouter>
    <React.Suspense fallback={null}>
      <Layout>
        <Switch>
          <Route exact path={'/dashboard'} component={Dashboard} />
          <Route exact path={'/gallery'} component={Gallery} />
          <Route exact path={'/combine'} component={Combine} />
          <Route component={NoMatch} />
        </Switch>
      </Layout>
    </React.Suspense>
  </HashRouter>;
};

export default Router;