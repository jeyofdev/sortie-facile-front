import { FormControl, FormGroup } from '@angular/forms';
import { FormPassword } from './form-password.type';

export type FormAccountPassword = {
	currentPassword: FormControl<string>;
	passwordForm: FormGroup<FormPassword>;
};
