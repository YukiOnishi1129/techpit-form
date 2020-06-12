import actionCreatorFactory from 'typescript-fsa';
import { CollegeResult } from '../../domain/entity/college';

const actionCreator = actionCreatorFactory();

const collegesActions = {
  // actionCreatorでactionを引数に入れて作成
  setSearchWord: actionCreator<string>('SET_SEARCH_WORD'),
  // 非同期処理
  searchCollege: actionCreator.async<{}, CollegeResult[], {}>('SEARCH_COLLEGE'),
};

export default collegesActions;
