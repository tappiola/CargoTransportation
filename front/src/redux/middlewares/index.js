import thunk from 'redux-thunk';
import { someMiddleware } from './someMiddleware';

const middlewares = [
  someMiddleware,
  thunk,
];

export default middlewares;
