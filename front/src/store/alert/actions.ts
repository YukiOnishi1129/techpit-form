import actionCreatorFactory from 'typescript-fsa';
import { AlertState } from '../../domain/entity/alert';

const actionCreator = actionCreatorFactory();

// Omit: 第二引数のプロパティを除いた第一引数のデータ構造で型を再定義
// AlertStateのopen以外のフィールドという意味
type AlertPayload = Omit<AlertState, 'open'>;

const alertActions = {
  openAlert: actionCreator<AlertPayload>('OPEN_ALERT'),
  closeAlert: actionCreator<{}>('CLOSE_ALERT'),
};

export default alertActions;
