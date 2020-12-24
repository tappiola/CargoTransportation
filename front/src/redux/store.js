import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import middlewares from './middlewares';
import rootReduser from "./reducers/root";

export default createStore(
  rootReduser,
  composeWithDevTools(applyMiddleware(...middlewares))
);