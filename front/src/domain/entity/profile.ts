import { Gender } from './gender';

// Profileオブジェクトのデータ構造を定義
export type Profile = {
  name: string;
  description: string;
  birthday: string;
  gender: Gender;
};
