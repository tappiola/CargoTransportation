import React from 'react';
import { connect } from 'react-redux';
import { someActionCreator } from '../../redux/actions';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Acts from '../Main/Acts/Acts';
import Clients from "../Main/Clients/Clients";
import ConsignmentNotes from "../Main/ConsignmentNotes/ConsinmentNotes";
import Mailings from "../Main/Mailings/Mailings";
import MainMenu from "../MainMenu/MainMenu";
import Reports from "../Main/Reports/Reports";
import Users from "../Main/Users/Users";
import Warehouses from "../Main/Warehouses/Warehouses";
import Waybills from "../Main/Waybills/Waybills";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';

const theme = createMuiTheme({
  palette: {
      // type: 'dark',
  },
}, ruRU);

// TODO: get from redux store
export const AllowedPaths = [
    '/acts',
    '/clients',
    '/warehouses',
    '/consignment-notes',
    '/reports',
    '/waybills',
    '/mailings',
    '/users',
];

const PATHS_TO_COMPONENTS = [
    {path: '/acts', componentName: Acts},
    {path: '/clients', componentName: Clients},
    {path: '/consignment-notes', componentName: ConsignmentNotes},
    {path: '/mailings', componentName: Mailings},
    {path: '/reports', componentName: Reports},
    {path: '/users', componentName: Users},
    {path: '/warehouses', componentName: Warehouses},
    {path: '/waybills', componentName: Waybills},
]

function App() {
  return (
      <ThemeProvider theme={theme}>
      <MainMenu>
          <Router>
            <Switch>
                {PATHS_TO_COMPONENTS
                    .filter(i => AllowedPaths.includes(i.path))
                    .map(i => <Route key={i.path.slice(1)} path={i.path} component={i.componentName}/>)
                    }
                    <Route>У вас нет доступа к запрашиваемой странице</Route>
                    # TODO: add autoredirect to first tab available to user after login
            </Switch>
          </Router>
      </MainMenu>
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
