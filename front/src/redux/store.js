import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import middlewares from './middlewares';
import rootReduser from './reducers/root';
import { throttle } from 'utils';

export const loadState = () => {
  try {
<<<<<<< HEAD
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
=======
    return JSON.parse(localStorage.getItem('state')) || undefined;
>>>>>>> 4e84014ed8f471dd7cee7f0b6d8e0a76abf40d71
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
