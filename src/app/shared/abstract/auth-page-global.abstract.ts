import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';

export class AuthPageGlobalAbstract<T extends { [key: string]: AbstractControl<any, any> }> {
	validationMessages!: ValidationMessages[];

	mainForm!: FormGroup<T>;

	formError!: string;

	protected getValidationMessages(name: string): ValidationMessage | null {
		try {
			const validationMessage: ValidationMessages = this.validationMessages.find(
				vm => vm.getName() === name,
			) as ValidationMessages;

			if (!validationMessage) {
				throw new Error(`Validation messages not found for name: ${name}`);
			}

			return validationMessage.getMessages();
		} catch (err) {
			console.error(err);
			return null;
		}
	}
}
