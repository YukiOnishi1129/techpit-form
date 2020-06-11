import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';

import { Career } from '../../domain/entity/career';

// 初期値にProfileの型を指定している
const init: Profile = {
  name: '',
  description: '',
  birthday: '',
  gender: '',
  address: {
    postalcode: '',
    prefecture: '',
    city: '',
    restAddress: '',
  },
  careers: [],
};

// 会社情報の初期値
const initCareer: Career = {
  company: '',
  position: '',
  startAt: '',
  endAt: '',
};

const profileReducer = reducerWithInitialState(init)
  // caseをチェーンさせることで、それぞれのアクションでの処理を記述
  //   第一引数：アクション
  // 第２引数：コールバック関数
  .case(profileActions.setProfile, (state, payload) => ({
    ...state, //直前のprofileというstate
    ...payload, // アクションから渡ってきたpayload
  }))
  .case(profileActions.setAddress, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload },
  }))
  .case(profileActions.searchAddress.done, (state, payload) => ({
    ...state,
    address: { ...state.address, ...payload.result },
  }))
  .case(profileActions.setCareer, (state, payload) => ({
    ...state,
    // map関数を使用することで、新しい配列を返すことができる
    careers: state.careers.map((c, i) =>
      i === payload.index ? { ...c, ...payload.career } : c
    ),
  }))
  .case(profileActions.deleteCareer, (state, payload) => ({
    ...state,
    // filter関数
    // indexと一致する物だけfalseを返すことで、一致しない物だけを返す
    careers: state.careers.filter((_, i) => i !== payload),
  }))
  .case(profileActions.addCareer, (state) => ({
    ...state,
    careers: [...state.careers, initCareer],
  }));
//   redux では直接値を更新してはいけない

export default profileReducer;
