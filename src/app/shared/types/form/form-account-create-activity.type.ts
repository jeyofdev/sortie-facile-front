import { FormControl, FormGroup } from '@angular/forms';
import { FormYearOld } from './form-year-old.type';
import { FormAccountActivityAddress } from './form-account-activity-address.type';

export type FormAccountCreateActivity = {
	title: FormControl<string>;
	description: FormControl<string>;
	yearOldForm: FormGroup<FormYearOld>;
	participant: FormControl<number>;
	date: FormControl<string>;
	addressForm: FormGroup<FormAccountActivityAddress>;
	link: FormControl<string | null>;
};
