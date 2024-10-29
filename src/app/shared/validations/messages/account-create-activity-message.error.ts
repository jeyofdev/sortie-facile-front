import { ValidationMessages } from '@shared/models/validation-messages.model';

export const validationAccountCreateActivityMessages: ValidationMessages[] = [
	new ValidationMessages('title', {
		required: 'The title is required.',
		minlength: 'The title must be at least 5 characters long.',
		maxlength: 'The title must be 200 characters maximum.',
	}),
	new ValidationMessages('description', {
		required: 'The description is required.',
		minlength: 'The description must contains minimum 10 characters.',
	}),
	new ValidationMessages('minAge', {
		required: 'The minimum age of birth is required.',
	}),
	new ValidationMessages('maxAge', {
		required: 'The maximum age is required for registration.',
	}),
	new ValidationMessages('participant', {
		required: 'The participant number is required.',
	}),
	new ValidationMessages('date', {
		required: 'The region is required for registration.',
	}),
	new ValidationMessages('region', {
		required: 'The region is required.',
	}),
	new ValidationMessages('department', {
		required: 'The department is required.',
	}),
	new ValidationMessages('city', {
		required: 'The city is required for registration.',
	}),
	new ValidationMessages('link', {}),
];
