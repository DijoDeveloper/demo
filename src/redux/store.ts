import IndexReducer from './reducers/Index.reducer';
import {createStore} from 'redux';
import initialState from './initialState';
/**
 * set initial state as immutable
 */

export default function configureStore() {
  return createStore(IndexReducer, initialState);
}
