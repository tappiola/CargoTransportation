import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import { getCustomTheme } from 'config';
import { ToastQueueProvider } from '@tappiola/material-ui-externals';
import Settings from './pages/Settings';
import { THEME } from './constants/themes';
import StyleGuide from './pages/StyleGuide';
import Notifier from './components/Notifier';

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
        {process.env.NODE_ENV === 'development' && <Route exact path="/styleguide" component={StyleGuide} />}
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
  const { isAuthorized } = useSelector(({ currentUser }) => currentUser);
  const [theme, setTheme] = useState(localStorage.getItem('cargoTheme') || THEME.LIGHT);

  useEffect(() => {
    localStorage.setItem('cargoTheme', theme);
  }, [theme]);

  return (
    <ThemeProvider theme={getCustomTheme(theme)}>
      <ToastQueueProvider theme={getCustomTheme(theme)}>
        <CssBaseline />
        <Notifier />
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
      </ToastQueueProvider>
    </ThemeProvider>
  );
}

export default App;
