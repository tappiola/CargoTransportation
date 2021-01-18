import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from './middlewares';
import rootReduser from './reducers/root';
import { createStore, applyMiddleware } from 'redux';
import { throttle } from 'utils';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
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
