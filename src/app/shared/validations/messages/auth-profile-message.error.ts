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
	new ValidationMessages('dateOfBirth', {
		required: 'The date of birth is required for registration.',
		pattern: 'Invalid date format. Please provide a correct date.',
	}),
	new ValidationMessages('streetNumber', {
		required: 'The street number is required for registration.',
	}),
	new ValidationMessages('street', {
		required: 'The street is required for registration.',
	}),
	new ValidationMessages('region', {
		required: 'The region is required for registration.',
	}),
	new ValidationMessages('department', {
		required: 'The department is required for registration.',
	}),
	new ValidationMessages('city', {
		required: 'The city is required for registration.',
	}),
	new ValidationMessages('phone', {
		required: 'The phone is required for registration.',
	}),
	new ValidationMessages('twitter', {
		minlength: 'The twitter username must be at least 3 characters long.',
	}),
	new ValidationMessages('instagram', {
		minlength: 'The instagram username must be at least 3 characters long.',
	}),
	new ValidationMessages('facebook', {
		minlength: 'The facebook username must be at least 3 characters long.',
	}),
	new ValidationMessages('description', {
		required: 'The description is required for registration.',
		minlength: 'The facebook username must be at least 20 characters long.',
	}),
];
