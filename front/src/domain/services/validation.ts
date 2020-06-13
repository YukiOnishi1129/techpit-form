import { Profile } from '../entity/profile';
import { Validation } from '../entity/validation';
import { PROFILE } from './profile';
import { College } from '../entity/college';
import { Career } from '../entity/career';

export const calculateValidation = (profile: Profile) => {
  const message: Validation = {
    name: emptyValidation(profile.name, PROFILE.NAME),
    description: lengthValidation(profile.description, 1000),
    birthday: emptyValidation(profile.birthday, PROFILE.BIRTHDAY),
    gender: emptyValidation(profile.gender, PROFILE.GENDER),
    address: {
      postalcode: emptyValidation(
        profile.address.postalcode,
        PROFILE.ADDRESS.POSTALCODE
      ),
      prefecture: emptyValidation(
        profile.address.prefecture,
        PROFILE.ADDRESS.PREFECTURE
      ),
      city: emptyValidation(profile.address.city, PROFILE.ADDRESS.CITY),
      restAddress: emptyValidation(
        profile.address.restAddress,
        PROFILE.ADDRESS.RESTADDRESS
      ),
    },
    college: {
      faculty: facultyValidation(profile.college),
    },
    careers: careerValidation(profile.careers),
  };

  return message;
};

// オブジェクトの要素をフラットなstringの配列にし、それが全て空であるかを判定する
export const isValid = (message: Validation) => {
  // オブジェクトの要素をstringのフラットな配列に返す
  //   Object.values：オブジェクトの値のみ、文字列の配列として取り出す
  const falttenValues = Object.values(message)
    .map(extractValues)
    // careerが配列なので、flat(2)で2階層まで展開する
    .flat(2) as string[];

  // 配列が全て空であればtrue
  return falttenValues.every((fv) => !fv);
};

// 再帰的にObjectを配列に
// 引数がstringならreturn
// string以外(オブジェクト)なら、再度extractValuesを呼び出して、stringのプロパティに当たるまで繰り返す
const extractValues = (obj: any): any[] | string => {
  if (typeof obj === 'string') return obj;
  return Object.values(obj).map(extractValues);
};
// 必須項目
const emptyValidation = (target: string, col: string) =>
  isEmpty(target) ? `${col}を入力してください` : '';

const lengthValidation = (target: string, maxLen: number) =>
  isTooLong(target, maxLen) ? `${maxLen}文字以下で入力してください。` : '';

//   職歴のバリデーション
const careerValidation = (careers: Career[]) =>
  careers.map((c) => ({
    company: emptyValidation(c.company, PROFILE.CAREERS.COMPANY),
    position: emptyValidation(c.position, PROFILE.CAREERS.POSITION),
    startAt: emptyValidation(c.startAt, PROFILE.CAREERS.START_AT),
    endAt: emptyValidation(c.endAt, PROFILE.CAREERS.END_AT),
  }));

//   学歴のバリデーション
const facultyValidation = (college: College) =>
  college.name && !college.faculty
    ? `${PROFILE.COLLEGE.FACULTY}を入力してください。`
    : '';

//   入力項目の空文字判定のビジネスロジック
const isEmpty = (str: string) => !str.trim();

// 最大文字数判定のビジネスロジック
const isTooLong = (str: string, maxLen: number) => str.trim().length >= maxLen;
