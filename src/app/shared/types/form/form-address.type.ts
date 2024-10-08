import { FormControl, FormGroup } from '@angular/forms';
import { FormStreet } from '@shared/types/form/form-street.type';

export type FormAddress = {
	streetForm: FormGroup<FormStreet>;
	region: FormControl<number>;
	department: FormControl<number>;
	city: FormControl<number>;
};
