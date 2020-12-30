import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu';
import { someActionCreator } from 'redux/actions';
import { PROTECTED_ROUTES } from 'pages';

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
            {PROTECTED_ROUTES.map((m) => (
              <Route key={m.basePath.slice(1)} path={m.basePath} component={m.component} />
            ))}
            {PROTECTED_ROUTES.length > 0 && <Route exact path="/"><Redirect to={PROTECTED_ROUTES[0].basePath} /></Route>}
            <Route>У вас нет доступа к запрашиваемой странице</Route>
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
