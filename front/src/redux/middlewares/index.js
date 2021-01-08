import { someMiddleware } from './someMiddleware';
import thunk from 'redux-thunk';

const middlewares = [
  someMiddleware,
  thunk,
];

export default middlewares;
