import thunk from 'redux-thunk';
import { someMiddleware } from './someMiddleware';

const middlewares = [thunk, someMiddleware];

export default middlewares;
