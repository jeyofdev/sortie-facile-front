import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationForgotPasswordMessages: ValidationMessages[] = [
	new ValidationMessages('email', {
		required: 'Email is required for registration.',
		pattern: 'Invalid email format. Please provide a correct email address.',
	}),
];
