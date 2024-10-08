import { FormControl, FormGroup } from '@angular/forms';
import { FormName } from '@shared/types/form/form-name.type';

export type FormPersonalInfo = {
	nameForm: FormGroup<FormName>;
	dateOfBirth: FormControl<string>;
};
