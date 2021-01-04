import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu';
import { PROTECTED_ROUTES } from 'pages';
import SignIn from 'pages/SignIn';
import { customTheme } from 'config';

const ProtectedApp = () => {
  const [protectedRoute] = PROTECTED_ROUTES;

  return (
    <MainMenu>
      <Switch>
        {PROTECTED_ROUTES.map(({ basePath, component }) => (
          <Route
            key={basePath.slice(1)}
            path={basePath}
            component={component}
          />
        ))}
        {protectedRoute && (
          <>
            <Route exact path="/">
              <Redirect to={protectedRoute.basePath} />
            </Route>
            <Route exact path="/signin">
              <Redirect to={protectedRoute.basePath} />
            </Route>
          </>
        )}
        <Route>У вас нет доступа к запрашиваемой странице</Route>
      </Switch>
    </MainMenu>
  );
};

function App({ isAuthorized }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Router>
        {isAuthorized ? (
          <ProtectedApp />
        ) : (
          <>
            <Route path="/signin" component={SignIn} />
            <ProtectedApp />
            <Redirect to="/new-company" />
            {/* <Redirect to="/signin" /> */}
          </>
        )}
      </Router>
    </ThemeProvider>
  );
}

const mapState = ({
  currentUser: {
    authorization: { isSuccess },
  },
}) => ({
  isAuthorized: isSuccess,
});

export default connect(mapState, null)(App);
