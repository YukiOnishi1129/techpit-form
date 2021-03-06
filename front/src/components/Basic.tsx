import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormHelperText,
} from '@material-ui/core';

import useStyles from './styles';
import { PROFILE } from '../domain/services/profile';

import { RootState } from '../domain/entity/rootState';

import { Profile } from '../domain/entity/profile';
import { Gender } from '../domain/entity/gender';
import { calculateValidation } from '../domain/services/validation';
import validationActions from '../store/validation/actions';

import profileActions from '../store/profile/actions';

const Basic = () => {
  // useDispatch: dispatchをする関数を作成するhooks
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const classes = useStyles();

  //   Profileを部分的に更新する
  const handleChange = (member: Partial<Profile>) => {
    dispatch(profileActions.setProfile(member));
    recalculateValidation(member);
  };

  // バリデーションを再計算
  const recalculateValidation = (member: Partial<Profile>) => {
    // isStartValidationがtrue (保存ボタンが押されるまで、再計算は実施されない)
    if (!validation.isStartValidation) return;

    // storeのprofileを直接dispatchに送ると更新されない
    // recalculateValidationの中で参照できるのは更新前のprofileだけ

    // 新しい状態を定義してそれを元にstoreを更新する必要あり

    // profileにmemberを更新する
    // スプレッド構文について
    // https://qiita.com/akisx/items/682a4283c13fe336c547
    const newProfile = {
      ...profile,
      ...member,
    };
    // const message = calculateValidation(profile); // これだと更新されない
    const message = calculateValidation(newProfile); // newProfileのように新しい状態を再定義する必要あり
    dispatch(validationActions.setValidation(message));
  };

  return (
    <>
      <TextField
        fullWidth
        className={classes.formField}
        label={PROFILE.NAME}
        required //必須項目
        error={!!validation.message.name} // !!: 項目内エラー文字列が空かどうかの判定
        helperText={validation.message.name} // エラーメッセージを表示
        value={profile.name}
        onChange={(e) => handleChange({ name: e.target.value })}
      />
      <TextField
        fullWidth
        multiline
        error={!!validation.message.description}
        helperText={validation.message.description}
        className={classes.formField}
        rows={5}
        label={PROFILE.DESCRIPTION}
        value={profile.description}
        onChange={(e) => handleChange({ description: e.target.value })}
      />
      <FormControl
        error={!!validation.message.gender}
        required
        className="classes.formField"
      >
        <FormLabel>{PROFILE.GENDER}</FormLabel>
        <RadioGroup
          value={profile.gender}
          onChange={(e) => handleChange({ gender: e.target.value as Gender })}
        >
          <FormControlLabel
            value="male"
            label="男性"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="female"
            label="女性"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
        <FormHelperText>{validation.message.gender}</FormHelperText>
      </FormControl>
      <TextField
        fullWidth
        required
        error={!!validation.message.birthday}
        helperText={validation.message.birthday}
        className={classes.formField}
        label={PROFILE.BIRTHDAY}
        type="date"
        value={profile.birthday}
        onChange={(e) => handleChange({ birthday: e.target.value })}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
};

export default Basic;
