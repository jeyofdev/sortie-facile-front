import { FormControl, FormGroup } from '@angular/forms';
import { FormPassword } from './form-password.type';

export type FormAccountPassword = {
	oldPassword: FormControl<string>;
	passwordForm: FormGroup<FormPassword>;
};
