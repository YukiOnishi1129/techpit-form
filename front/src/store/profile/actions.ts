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
  // actionCreator.async<第一引数, 第二引数, 第三匹数>
  // 第一引数：start
  // 第二匹数：done API正常実施後の処理
  // 第三匹数: fail APIエラー後の処理
  searchAddress: actionCreator.async<{}, Partial<Address>, {}>(
    'SEARCH_ADDRESS'
  ),
};

export default profileActions;
