import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationSigninMessages: ValidationMessages[] = [
	new ValidationMessages('email', {
		required: 'Email is required for registration.',
		pattern: 'Invalid email format. Please provide a correct email address.',
	}),
	new ValidationMessages('password', {
		required: 'Password is required for registration.',
		minlength: 'Password must be at least 8 characters long.',
	}),
];
