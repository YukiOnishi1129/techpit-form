import { Gender } from './gender';
import { Address } from './address';

// Profileオブジェクトのデータ構造を定義
export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
  address: Address;
};
