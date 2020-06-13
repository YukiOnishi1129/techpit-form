import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { TextField } from '@material-ui/core';
import { PROFILE } from '../domain/services/profile';

import { RootState } from '../domain/entity/rootState';
import { Address as IAddress } from '../domain/entity/address';
import profileActions from '../store/profile/actions';
import { isPostalcode } from '../domain/services/address';
import { searchAddressFormPostalcode } from '../store/profile/effects';

import useStyles from './styles';

const Address = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);
  const validation = useSelector((state: RootState) => state.validation);
  const classes = useStyles();

  // storeの住所情報を部分的に更新する
  const handleAddresChange = (member: Partial<IAddress>) => {
    dispatch(profileActions.setAddress(member));
  };

  // storeの郵便番号情報を更新し、その郵便番号を元にAPI通信にて住所情報を取得
  const handlePostalcodeChange = (code: string) => {
    if (!isPostalcode(code)) return;
    dispatch(profileActions.setAddress({ postalcode: code }));
    //API通信処理
    dispatch(searchAddressFormPostalcode(code));
  };

  return (
    <>
      <TextField
        fullWidth
        required
        error={!!validation.message.address.postalcode}
        helperText={validation.message.address.postalcode}
        className={classes.formField}
        label={PROFILE.ADDRESS.POSTALCODE}
        value={profile.address.postalcode}
        onChange={(e) => handlePostalcodeChange(e.target.value)}
      />
      <TextField
        fullWidth
        required
        error={!!validation.message.address.prefecture}
        helperText={validation.message.address.prefecture}
        className={classes.formField}
        label={PROFILE.ADDRESS.PREFECTURE}
        value={profile.address.prefecture}
        onChange={(e) => handleAddresChange({ prefecture: e.target.value })}
      />
      <TextField
        fullWidth
        required
        error={!!validation.message.address.city}
        helperText={validation.message.address.city}
        className={classes.formField}
        label={PROFILE.ADDRESS.CITY}
        value={profile.address.city}
        onChange={(e) => handleAddresChange({ city: e.target.value })}
      />
      <TextField
        fullWidth
        className={classes.formField}
        error={!!validation.message.address.restAddress}
        helperText={validation.message.address.restAddress}
        label={PROFILE.ADDRESS.RESTADDRESS}
        value={profile.address.restAddress}
        onChange={(e) => handleAddresChange({ restAddress: e.target.value })}
      />
    </>
  );
};

export default Address;
