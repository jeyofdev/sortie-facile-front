import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationLoginMessages } from '@shared/validations/messages/login-message.error';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent implements OnInit {
	formIsSubmitted: boolean = false;
	validationMessages!: ValidationMessages[];
	loginForm!: FormGroup;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;

	regexEmail!: RegExp;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.validationMessages = validationLoginMessages;
		this.initFormControls();
		this.initLoginForm();
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
		this.formIsSubmitted = true;

		for (const control in this.loginForm.controls) {
			this.loginForm.controls[control].markAsTouched();
		}

		console.log(this.loginForm.value);
	}

	private initLoginForm() {
		this.loginForm = this.formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	private initFormControls(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.emailCtrl = this.formBuilder.control('', [Validators.required, Validators.pattern(this.regexEmail)]);
		this.passwordCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(8)]);
	}
}
