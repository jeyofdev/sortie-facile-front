import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-address-page',
	templateUrl: './address-page.component.html',
	styleUrl: './address-page.component.scss',
})
export class AddressPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];

	mainForm!: FormGroup;
	streetForm!: FormGroup;

	streetNumberCtrl!: FormControl;
	streetCtrl!: FormControl;

	formError!: string;

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.validationMessages = validationAuthProfileMessages;

		this.initFormControls();
		this.initSignupForm();
	}

	getValidationMessages(name: string): ValidationMessage | null {
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

	onSubmit(): void {
		console.log('Form Value:', this.mainForm.value);
		console.log('Form Value:', this.mainForm);
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			streetForm: this.streetForm,
		});
	}

	private initFormControls(): void {
		this.streetNumberCtrl = this._formBuilder.control('', [Validators.required]);
		this.streetCtrl = this._formBuilder.control('', [Validators.required]);

		this.streetForm = this._formBuilder.group({
			streetNumber: this.streetNumberCtrl,
			street: this.streetCtrl,
		});
	}
}
