import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Profile } from '../../domain/entity/profile';
import profileActions from './actions';

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
  }));
//   redux では直接値を更新してはいけない

export default profileReducer;
