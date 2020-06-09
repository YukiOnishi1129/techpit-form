import { createStore, combineReducers } from 'redux';
import profileReducer from './profile/reducer';
import { RootState } from '../domain/entity/rootState';

const store = createStore(
  combineReducers<RootState>({
    profile: profileReducer,
  }),
  //   redux dev toolsWO使用するための記述
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
