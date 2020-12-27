import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const NewCompanyForm = React.lazy(() => import('../NewCompanyForm/NewCompanyForm'));
// const Home = lazy(() => import("../Home/Home"));
const Content = () => <p>On main page</p>;

function Main() {
  return (
    <main>
      <React.Suspense fallback={<p>loading</p>}>
        <Router>
          <Switch>
            <Route path="/new-company" component={NewCompanyForm} />
            <Route exact path="/" component={Content} />
          </Switch>
        </Router>
      </React.Suspense>
    </main>
  );
}

export default Main;
