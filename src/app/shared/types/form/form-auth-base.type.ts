import { FormControl, FormGroup } from '@angular/forms';

export type FormAuthBase = {
	email: FormControl<string>;
	password: FormControl<string>;
};
