import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';

import MainMenu from 'components/MainMenu';
import { getCustomTheme } from 'config';
import { THEME } from 'constants/themes';
import { PROTECTED_ROUTES } from 'pages';
import Settings from 'pages/Settings';
import SignIn from 'pages/SignIn';

const ProtectedApp = ({ userRoles, theme, setTheme }) => {
  const routes = PROTECTED_ROUTES
    .filter(({ roles: routeRoles }) => routeRoles.some((role) => userRoles.includes(role)));
  const modules = routes.map(({ module }) => module);
  const [protectedRoute] = routes;

  return (
    <MainMenu modules={modules}>
      <Switch>
        {routes.map(({ basePath, component }) => (
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

function App() {
  const { isAuthorized, roles } = useSelector(({ currentUser }) => currentUser);
  const [theme, setTheme] = useState(localStorage.getItem('cargoTheme') || THEME.LIGHT);

  useEffect(() => {
    localStorage.setItem('cargoTheme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={getCustomTheme(theme)}>
      <CssBaseline />
      <Router>
        {isAuthorized ? (
          <ProtectedApp theme={theme} setTheme={setTheme} userRoles={roles} />
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

export default App;
