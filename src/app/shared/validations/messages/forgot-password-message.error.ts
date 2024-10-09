import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationForgotPasswordMessages: ValidationMessages[] = [
	new ValidationMessages('email', {
		required: 'Email is required for registration.',
		pattern: 'Invalid email format. Please provide a correct email address.',
	}),
	new ValidationMessages('password', {
		required: 'Password is required for registration.',
		minlength: 'Password must be at least 8 characters long.',
	}),
	new ValidationMessages('confirmPassword', {
		required: 'Confirm password is required for registration.',
		minlength: 'Confirm password must be at least 8 characters long.',
	}),
];
