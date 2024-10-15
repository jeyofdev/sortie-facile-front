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
	new ValidationMessages('phone', {
		required: 'The phone is required.',
		pattern:
			'The format of the phone number is incorrect. Please enter a valid phone number in the format: 01 99 99 99 99.',
	}),
	new ValidationMessages('twitter', {
		minlength: 'The twitter username must be at least 3 characters long.',
		maxlength: 'The twitter username must have a maximum 30 characters long.',
	}),
	new ValidationMessages('instagram', {
		minlength: 'The instagram username must be at least 3 characters long.',
		maxlength: 'The instagram username must have a maximum 30 characters long.',
	}),
	new ValidationMessages('facebook', {
		minlength: 'The facebook username must be at least 3 characters long.',
		maxlength: 'The facebook username must have a maximum 30 characters long.',
	}),
];
