import { Dispatch } from 'redux';
import profileActions from './actions';
import { Address } from '../../domain/entity/address';

import {
  isCompletePostalcode,
  sanitizePostalcode,
} from '../../domain/services/address';

export const searchAddressFormPostalcode = (code: string) => async (
  dispatch: Dispatch
) => {
  if (!isCompletePostalcode(code)) return;

  const res = await fetch(
    `https://apis.postcode-jp.com/api/v3/postcodes?apikey=qj53T0yB6q0Bbc0snv5DeqH9EiG9CGO4PHEqqXK&postcode=${sanitizePostalcode(
      code
    )}`
  );
  const result = await res.json();

  if (!result.data[0]) return;

  const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town,
  };

  dispatch(profileActions.searchAddress.done({ result: address, params: {} }));
};
