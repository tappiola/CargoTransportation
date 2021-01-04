import React, { useEffect, useState } from 'react';
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
import { someActionCreator } from 'redux/actions';
import { PROTECTED_ROUTES } from 'pages';
import SignIn from 'pages/SignIn';
import { getCustomTheme } from 'config';
import Settings from './pages/Settings';
import { THEME } from './constants/themes';

const ProtectedApp = ({ theme, setTheme }) => {
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
        <Route path="/settings">
          <Settings theme={theme} onThemeChange={setTheme} />
        </Route>
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
  const [theme, setTheme] = useState(localStorage.getItem('cargoTheme') || THEME.LIGHT);

  useEffect(() => {
    localStorage.setItem('cargoTheme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={getCustomTheme(theme)}>
      <CssBaseline />
      <Router>
        {isAuthorized ? (
          <ProtectedApp theme={theme} setTheme={setTheme} />
        ) : (
          <>
            <Route path="/signin" component={SignIn} />
            <Redirect to="/signin" />
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

const mapDispatch = (dispatch) => ({
  onInit(data) {
    dispatch(someActionCreator(data));
  },
});

export default connect(mapState, mapDispatch)(App);
