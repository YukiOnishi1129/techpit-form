import { reducerWithInitialState } from 'typescript-fsa-reducers';
import collegesActions from './actions';
import { Colleges } from '../../domain/entity/college';

const init: Colleges = {
  result: [], //API取得結果
  search: '', // 検索ワード
};

const collegeReducer = reducerWithInitialState(init)
  // 検索ワードの更新処理
  .case(collegesActions.setSearchWord, (state, payload) => ({
    ...state,
    search: payload,
  }))
  // API取得結果の更新処理
  .case(collegesActions.searchCollege.done, (state, payload) => ({
    ...state,
    result: payload.result,
  }));

export default collegeReducer;
