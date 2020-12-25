import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const SignIn = lazy(() => import('../SignIn/SignIn'));
// const Home = lazy(() => import("../Home/Home"));
const Content = () => <p>On main page</p>;

function Main() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/" component={Content} />
          </Switch>
        </Router>
      </Suspense>
    </main>
  );
}

export default Main;
