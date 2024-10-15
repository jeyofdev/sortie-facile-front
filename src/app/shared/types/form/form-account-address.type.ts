import { FormControl } from '@angular/forms';

export type FormAccountAddress = {
	streetNumber: FormControl<string>;
	street: FormControl<string>;
	region: FormControl<number>;
	department: FormControl<number>;
	city: FormControl<number>;
};
