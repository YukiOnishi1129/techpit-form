// バリデーションのエラーメッセージを格納するためのデータ構造
export type Validation = {
  name: string;
  description: string;
  birthday: string;
  gender: string;
  address: {
    postalcode: string;
    prefecture: string;
    city: string;
    restAddress: string;
  };
  college: {
    faculty: string;
  };
  careers: {
    company: string;
    position: string;
    startAt: string;
    endAt: string;
  }[];
};

// reduxで保存する状態のデータ構造
export type ValidationState = {
  isStartValidation: boolean;
  message: Validation;
};
