import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationAccountMessages: ValidationMessages[] = [
	new ValidationMessages('currentPassword', {
		required: 'Current password is required.',
		minlength: 'Current password must be at least 8 characters long.',
	}),
	new ValidationMessages('password', {
		required: 'Password is required.',
		minlength: 'Password must be at least 8 characters long.',
	}),
	new ValidationMessages('confirmPassword', {
		required: 'Confirm password is required.',
		minlength: 'Confirm password must be at least 8 characters long.',
	}),
];
