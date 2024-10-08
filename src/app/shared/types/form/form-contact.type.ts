import { FormControl, FormGroup } from '@angular/forms';
import { FormSocial } from '@shared/types/form/form-social.type';

export type FormContact = {
	phone: FormControl<string>;
	socialForm: FormGroup<FormSocial>;
};
