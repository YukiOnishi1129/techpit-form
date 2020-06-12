import { reducerWithInitialState } from 'typescript-fsa-reducers';
import collegeActions from './actions';
import { Colleges } from '../../domain/entity/college';

const init: Colleges = { search: '' };

const collegeReducer = reducerWithInitialState(init).case(
  collegeActions.setSearchWord,
  (state, payload) => ({
    ...state,
    search: payload,
  })
);

export default collegeReducer;
