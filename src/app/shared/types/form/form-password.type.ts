import { FormControl } from '@angular/forms';

export type FormPassword = {
	password: FormControl<string>;
	confirmPassword: FormControl<string>;
};
