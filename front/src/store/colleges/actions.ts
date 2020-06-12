import actionCreatorFactory from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const collegesActions = {
  // actionCreatorでactionを引数に入れて作成
  setSearchWord: actionCreator<string>('SET_SEARCH_WORD'),
};

export default collegesActions;
