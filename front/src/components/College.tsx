import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { RootState } from '../domain/entity/rootState';
import collegesActions from '../store/colleges/actions';

import useStyles from './styles';

const College = () => {
  // useDisptch: 状態をdispatchする関数を取得
  const dispatch = useDispatch();
  //   useSelector: 必要な情報を参照する
  const colleges = useSelector((state: RootState) => state.colleges);
  const classes = useStyles();

  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  return (
    <>
      <TextField
        className={classes.formField}
        fullWidth
        label="大学名を検索"
        value={colleges.search}
        onChange={(e) => handleChange(e.target.value)}
      />
    </>
  );
};

export default College;
