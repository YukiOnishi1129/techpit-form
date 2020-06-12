import { Dispatch } from 'redux';
import collegesActions from './actions';

export const searchColleges = (name: string) => async (dispatch: Dispatch) => {
  const url = `http://localhost:18001/colleges?name=${name}`;

  //   非同期通信
  const result = await fetch(url).then((res) => res.json());

  //   storeへの保存処理
  dispatch(
    collegesActions.searchCollege.done({
      result: result.results.school,
      params: {},
    })
  );
};
