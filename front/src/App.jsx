import React, { Suspense, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { ToastQueueProvider } from '@tappiola/material-ui-externals';

import Notifier from './components/Notifier';
import StyleGuide from './pages/StyleGuide';
import { isDevelopment } from './utils/environment';
import MainMenu from 'components/MainMenu';
import { getCustomTheme } from 'config';
import { THEME } from 'constants/themes';
import { PROTECTED_ROUTES } from 'pages';
import Settings from 'pages/Settings';
import SignIn from 'pages/SignIn';
import { refreshTokenIfExpired, getUserProfile } from 'redux/actions/currentUser';

const ProtectedApp = ({
  userRoles, userName, company, theme, setTheme,
}) => {
  const routes = PROTECTED_ROUTES
    .filter(({ roles: routeRoles }) => routeRoles.some((role) => userRoles.includes(role)));
  const modules = routes.map(({ module }) => module);
  const [protectedRoute] = routes;

  return (
    <MainMenu modules={modules} userName={userName} company={company}>
      <Suspense fallback={<div>Идет загрузка...</div>}>
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
          {isDevelopment() && (
          <Route exact path="/styleguide" component={StyleGuide} />
          )}
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
      </Suspense>
    </MainMenu>
  );
};

function App() {
  const {
    isAuthorized, roles, fullName, company,
  } = useSelector(({ currentUser }) => currentUser);
  const [theme, setTheme] = useState(localStorage.getItem('cargoTheme') || THEME.LIGHT);

  useEffect(() => {
    localStorage.setItem('cargoTheme', theme);
  }, [theme]);

  useEffect(() => refreshTokenIfExpired(), []);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserProfile());
    }
  }, [isAuthorized]);

  return (
    <ThemeProvider theme={getCustomTheme(theme)}>
      <ToastQueueProvider theme={getCustomTheme(theme)}>
        <CssBaseline />
        <Notifier />
        <Router>
          {isAuthorized ? (
            <ProtectedApp
              theme={theme}
              setTheme={setTheme}
              userRoles={roles}
              userName={fullName}
              company={company}
            />
          ) : (
            <>
              <Route path="/signin" component={SignIn} />
              <Redirect to="/signin" />
            </>
          )}
        </Router>
      </ToastQueueProvider>
    </ThemeProvider>
  );
}

export default App;
