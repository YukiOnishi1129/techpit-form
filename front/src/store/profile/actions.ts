import actionCreatorFactory from 'typescript-fsa';
import { Profile } from '../../domain/entity/profile';
import { Address } from '../../domain/entity/address';

const actionCreator = actionCreatorFactory();

const profileActions = {
  // Partial<Profile>：Profileの項目のうち、必要な物だけを渡す
  //   setProfileというactionのpayloadの型を定義

  //   Partialを選択した理由
  // inputで入力する時、nameやgenderを１つずつ更新していきたいため、部分的に使うようにする
  setProfile: actionCreator<Partial<Profile>>('SET_PROFILE'),
  setAddress: actionCreator<Partial<Address>>('SET_ADDRESS'),
};

export default profileActions;
