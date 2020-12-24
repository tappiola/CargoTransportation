import React /*lazy*/ from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// const Login = lazy(() => import("../Login/Login"));
// const Home = lazy(() => import("../Home/Home"));
const Content = () => <p>On main page</p>;

function Main(props) {
  return (
    <main>
      <Router>
        <Switch>
          {/* <Route path="/login" component={Login}/> */}
          <Route exact path="/" component={Content} />
        </Switch>
      </Router>
    </main>
  );
}

export default Main;
