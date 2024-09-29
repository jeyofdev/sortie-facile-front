import { ValidationMessage } from '@shared/types/validation-message.type';

export class ValidationMessages {
	constructor(
		private name: string,
		private messages: ValidationMessage,
	) {}

	getName(): string {
		return this.name;
	}

	getMessages(): ValidationMessage {
		return this.messages;
	}
}
