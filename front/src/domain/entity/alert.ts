export type AlertState = {
  // alert の種類
  severity: AlertServerity;
  //   alert に表示するメッセージ
  message: string;
  //   snackbarを表示しているかどうか
  open: boolean;
};

// severityはerror or successのどちらか
// stringリテラル型
export type AlertServerity = 'error' | 'success';
