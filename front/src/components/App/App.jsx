import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import CssBaseline from '@material-ui/core/CssBaseline';
import { someActionCreator } from '../../redux/actions';
import MainMenu from '../MainMenu/MainMenu';
import { ALLOWED_MODULES } from './ModulesConfig';

const theme = createMuiTheme({
  palette: {
    // type: 'dark',
  },
}, ruRU);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainMenu>
          <Switch>
            {Object.entries(ALLOWED_MODULES)
              .map(([, { basePath, component }]) => (
                <Route key={basePath.slice(1)} path={basePath} component={component} />
              ))}
            <Route>У вас нет доступа к запрашиваемой странице</Route>
            # TODO: add autoredirect to first tab available to user after login
          </Switch>
        </MainMenu>
      </Router>
    </ThemeProvider>
  );
}

const mapState = (state) => ({ ...state });

const mapDispatch = (dispatch) => ({
  onInit(data) {
    dispatch(someActionCreator(data));
  },
});

export default connect(mapState, mapDispatch)(App);
