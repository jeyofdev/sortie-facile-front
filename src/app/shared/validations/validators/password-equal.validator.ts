import { AbstractControl } from '@angular/forms';

/**
 * Check that the values ​​of password fields on a form are the same
 */
export const passwordEqualValidator = (c: AbstractControl): { [key: string]: boolean } | null => {
	const passwordCtrl = c.get('password');
	const passwordConfirmCtrl = c.get('confirmPassword');

	// Check if both fields are filled
	if (!passwordCtrl || !passwordConfirmCtrl) {
		return null;
	}

	if (passwordCtrl.value !== passwordConfirmCtrl.value) {
		return { matchPassword: true };
	}
	return null;
};
