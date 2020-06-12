import { Gender } from './gender';
import { Address } from './address';
import { College } from './college';
import { Career } from './career';

// Profileオブジェクトのデータ構造を定義
export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
  address: Address;
  college: College;
  careers: Career[];
};
