import { FormAccountAddress } from './form-account-address.type';
import { FormPersonalInfo } from './form-personal-info.type';

export type FormAccountProfile = Pick<FormPersonalInfo, 'nameForm' | 'dateOfBirth'> &
	Pick<FormAccountAddress, 'streetNumber' | 'street' | 'region' | 'department' | 'city'>;
