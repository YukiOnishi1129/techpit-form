import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { PROFILE } from '../domain/services/profile';
import { RootState } from '../domain/entity/rootState';
import collegesActions from '../store/colleges/actions';
import { searchColleges } from '../store/colleges/effects';

import { College as ICollege } from '../domain/entity/college';
import profileActions from '../store/profile/actions';

import useStyles from './styles';

const College = () => {
  // useDisptch: 状態をdispatchする関数を取得
  const dispatch = useDispatch();
  //   useSelector: 必要な情報を参照する
  const colleges = useSelector((state: RootState) => state.colleges);
  const profile = useSelector((state: RootState) => state.profile);
  const classes = useStyles();

  // 大学名
  const currentCollege = colleges.result.filter(
    (c) => c.name === profile.college.name
  )[0];

  // 学部名
  // Optinal Chaining でエラーを回避している (currentCollege?)
  // ?をつけたオブジェクトが undefined でないときにのみ続く
  const currentFaculty = currentCollege?.faculty.filter(
    (f) => f.name === profile.college.faculty
  )[0];

  // 検索ワードの更新
  const handleChange = (name: string) => {
    dispatch(collegesActions.setSearchWord(name));
  };

  // 検索ワードを元に、大学の情報をAPIより取得
  const handleSearch = () => {
    dispatch(searchColleges(colleges.search));
  };

  //storeの大学情報を更新
  const handleCollegeChange = (member: Partial<ICollege>) => {
    dispatch(profileActions.setCollege(member));
  };

  // storeの大学情報、検索ワード、API取得結果をリセット
  const handleReset = () => {
    handleCollegeChange({ name: '', faculty: '', department: '' });
    dispatch(collegesActions.setSearchWord(''));
    dispatch(collegesActions.searchCollege.done({ result: [], params: {} }));
  };

  return (
    <>
      {/* profile.college.nameがない時だけ、UIを表示させる */}
      {!profile.college.name && (
        <>
          <TextField
            className={classes.formField}
            fullWidth
            label="大学名を検索"
            value={colleges.search}
            onChange={(e) => handleChange(e.target.value)}
          />
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={handleSearch}
            disabled={!colleges.search}
          >
            検索
          </Button>
          <Grid spacing={1} container>
            {colleges.result.map((c) => (
              <Grid key={c.name} item>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handleCollegeChange({ name: c.name })}
                >
                  {c.name}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {/* 大学名がある場合、学部名のUIを表示 */}
      {profile.college.name && (
        <>
          <TextField
            className={classes.formField}
            label={PROFILE.COLLEGE.NAME}
            fullWidth
            value={profile.college.name}
            disabled
          />
          <FormControl fullWidth className={classes.formField}>
            <InputLabel>{PROFILE.COLLEGE.FACULTY}</InputLabel>
            <Select
              value={profile.college.faculty}
              onChange={(e) =>
                handleCollegeChange({
                  faculty: e.target.value as string,
                  // 学部名を変更すると、学科名をリセットする
                  department: '',
                })
              }
            >
              {currentCollege.faculty.map((f) => (
                <MenuItem key={f.name} value={f.name}>
                  {f.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {/* 学科名がある場合、学科名のUIを表示 */}
          {currentFaculty?.department.length > 0 && (
            <FormControl fullWidth className={classes.formField}>
              <InputLabel>{PROFILE.COLLEGE.DEPARTMENT}</InputLabel>
              <Select
                value={profile.college.department}
                onChange={(e) =>
                  handleCollegeChange({ department: e.target.value as string })
                }
              >
                {currentFaculty.department.map((d) => (
                  <MenuItem key={d} value={d}>
                    {d}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          <Button
            fullWidth
            className={classes.button}
            onClick={handleReset}
            variant="outlined"
            color="secondary"
          >
            学歴の入力情報をリセット
          </Button>
        </>
      )}
    </>
  );
};

export default College;
