import { FormAccountAddress } from './form-account-address.type';

export type FormAccountActivityAddress = Pick<FormAccountAddress, 'region' | 'department' | 'city'>;
