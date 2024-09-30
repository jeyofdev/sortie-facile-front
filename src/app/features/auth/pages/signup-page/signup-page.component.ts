import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationSignupMessages } from '@shared/validations/messages/signup-message.error';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];
	regexEmail!: RegExp;

	mainForm!: FormGroup;
	formError!: string;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;

	redirectLink!: string;

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.validationMessages = validationSignupMessages;

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
		if (this.mainForm.valid) {
			console.log(this.mainForm.value);
		} else {
			this.formError = 'The form contains errors. Please check your informations.';
		}
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	private initFormControls(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.emailCtrl = this._formBuilder.control('', [Validators.required, Validators.pattern(this.regexEmail)]);
		this.passwordCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(8)]);
	}
}
