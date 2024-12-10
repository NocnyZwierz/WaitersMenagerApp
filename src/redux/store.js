import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import initialState from './initialState';
import tablesReducer from './tablesRedux';

const subreducers = {
  tables: tablesReducer,
}

const reducer = combineReducers(subreducers);

const composedEnhancers = compose(
  applyMiddleware(thunk),    
);

const store = createStore(
  reducer,
  initialState,
  composedEnhancers
);


export default store;