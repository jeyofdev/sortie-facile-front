import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationAuthProfileMessages: ValidationMessages[] = [
	new ValidationMessages('firstname', {
		required: 'The firstname is required for registration.',
		minlength: 'The firstname must be at least 8 characters long.',
	}),
	new ValidationMessages('lastname', {
		required: 'The lastname is required for registration.',
		minlength: 'The lastname must be at least 8 characters long.',
	}),
];
