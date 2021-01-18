import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from './middlewares';
import rootReduser from './reducers/root';
import { throttle } from 'utils';

const loadState = () => {
  try {
    return JSON.parse(localStorage.getItem('state')) || undefined;
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch {
    // TODO: add nofication
  }
};

const persistedState = loadState();

const store = createStore(
  rootReduser,
  persistedState,
  composeWithDevTools(applyMiddleware(...middlewares)),
);

store.subscribe(throttle(() => {
  saveState({ ...store.getState() });
}, 1000));

export default store;
