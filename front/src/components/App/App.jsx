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
  overrides: {
    MuiDataGrid: {
      root: {
        // Hide non-localizable text with number of selected rows
        '&& .MuiDataGrid-selectedRowCount': {
          color: 'transparent',
        },
      },
    },
  },
}, ruRU);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <MainMenu>
          <Switch>
            {ALLOWED_MODULES.map((m) => (
              <Route key={m.basePath.slice(1)} path={m.basePath} component={m.component} />
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
