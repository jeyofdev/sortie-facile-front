import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationAccountMessages: ValidationMessages[] = [
	new ValidationMessages('firstname', {
		required: 'The firstname is required.',
		minlength: 'The firstname must be at least 2 characters long.',
		maxlength: 'The first name must be 30 characters maximum.',
	}),
	new ValidationMessages('lastname', {
		required: 'The lastname is required.',
		minlength: 'The lastname must be at least 2 characters long.',
		maxlength: 'The first name must be 30 characters maximum.',
	}),
	new ValidationMessages('dateOfBirth', {
		required: 'The date of birth is required.',
		pattern: 'Invalid date format. Please provide a correct date. The birthdate must be between 1900, and 2024.',
	}),
	new ValidationMessages('streetNumber', {
		required: 'The street number is required for registration.',
		pattern: 'The street number must have a maximum of 4 digits.',
	}),
	new ValidationMessages('street', {
		required: 'The street is required for registration.',
		maxlength: 'The street must be 100 characters maximum.',
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
	new ValidationMessages('oldPassword', {
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
	new ValidationMessages('description', {
		required: 'The description is required for registration.',
		minlength: 'The description must be at least 20 characters long.',
	}),
];
