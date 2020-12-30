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
import SignIn from '../SignIn/SignIn';

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

const ProtectedApp = () => (
  <MainMenu>
    <Switch>
      {
                PROTECTED_ROUTES.map((m) => (
                  <Route key={m.basePath.slice(1)} path={m.basePath} component={m.component} />
                ))
            }
      {PROTECTED_ROUTES.length > 0
            && <Route exact path="/"><Redirect to={PROTECTED_ROUTES[0].basePath} /></Route>}
      {PROTECTED_ROUTES.length > 0
            && <Route exact path="/signin"><Redirect to={PROTECTED_ROUTES[0].basePath} /></Route>}
      <Route>У вас нет доступа к запрашиваемой странице</Route>
    </Switch>
  </MainMenu>
);

function App({ isAuthorized }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {isAuthorized ? <ProtectedApp />
          : (
            <>
              <Route path="/signin" component={SignIn} />
              <Redirect to="/signin" />
            </>
          )}
      </Router>
    </ThemeProvider>
  );
}

const mapState = ({ currentUser: { authorization: { isSuccess } } }) => (
  {
    isAuthorized: isSuccess,
  }
);

const mapDispatch = (dispatch) => ({
  onInit(data) {
    dispatch(someActionCreator(data));
  },
});

export default connect(mapState, mapDispatch)(App);
