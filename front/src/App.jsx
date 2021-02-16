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
import { PROTECTED_ROUTES } from 'features';
import { refreshTokenIfExpired, getUserProfile, subscribeOnMessages } from 'features/CurrentUser/currentUserSlice';
import Settings from 'features/Settings';
import SignIn from 'features/SignIn';

import Notifier from './features/Notifier';
import StyleGuide from './features/StyleGuide';
import { isDevelopment } from './utils/environment';
import MainMenu from 'components/MainMenu';
import { getCustomTheme } from 'config';
import { THEME } from 'constants/themes';
import { URLS } from 'constants/urls';

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
          <Route path={URLS.SETTINGS}>
            <Settings theme={theme} onThemeChange={setTheme} />
          </Route>
          {isDevelopment() && (
          <Route exact path={URLS.STYLE_GUIDE} component={StyleGuide} />
          )}
          {protectedRoute && (
          <>
            <Route exact path="/">
              <Redirect to={protectedRoute.basePath} />
            </Route>
            <Route exact path={URLS.SIGN_IN}>
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
  const dispatch = useDispatch();
  const { isAuthorized, roles, fullName, company } = useSelector(({ currentUser }) => currentUser);
  const [theme, setTheme] = useState(localStorage.getItem('cargoTheme') || THEME.LIGHT);

  useEffect(() => {
    localStorage.setItem('cargoTheme', theme);
  }, [theme]);

  useEffect(() => refreshTokenIfExpired(), []);

  useEffect(() => {
    if (isAuthorized) {
      dispatch(getUserProfile());
      dispatch(subscribeOnMessages());
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
              <Route path={URLS.SIGN_IN} component={SignIn} />
              <Redirect to={URLS.SIGN_IN} />
            </>
          )}
        </Router>
      </ToastQueueProvider>
    </ThemeProvider>
  );
}

export default App;
