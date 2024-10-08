import { FormControl, FormGroup } from '@angular/forms';
import { FormPassword } from './form-password.type';

export type FormSignup = {
	email: FormControl<string>;
	passwordForm: FormGroup<FormPassword>;
};
