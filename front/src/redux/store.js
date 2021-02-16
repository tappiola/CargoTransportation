import { configureStore } from '@reduxjs/toolkit';

import rootReduser from './reducers/root';
import { throttle } from 'utils';

export const loadState = () => {
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

const store = configureStore({
  reducer: rootReduser,
  preloadedState: persistedState,
  devTools: process.env.NODE_ENV !== 'production',
});

store.subscribe(throttle(() => {
  saveState({ ...store.getState() });
}, 1000));

export default store;
