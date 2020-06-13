import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import profileReducer from './profile/reducer';
import collegeReducer from './colleges/reducer';
import validationReducer from './validation/reducer';
import { RootState } from '../domain/entity/rootState';

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
    colleges: collegeReducer,
    validation: validationReducer,
  }),
  compose(
    applyMiddleware(thunk),
    //   redux dev toolsWO使用するための記述
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
