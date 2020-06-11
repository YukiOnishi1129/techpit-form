import { Career } from '../entity/career';

// careersに１個でも全て空の職歴がある場合、新しい職歴を追加できないようにする
export const exitEmptyCareers = (careers: Career[]) =>
  // some関数：一つでもtrueがあればtrueを返す(everyと逆)
  careers.some((c) => isEmptyCareer(c));

// 空の職歴がないかどうか判定するロジック
const isEmptyCareer = (career: Career) => {
  // Object.values(obj); @: 引数に渡されたオブジェクトの値だけを取得する
  //   every()関数: 配列の要素を1個ずつ条件を満たしているかを見ていく、全てがtrueならtrueを返す
  return Object.values(career).every((v) => !v);
};
