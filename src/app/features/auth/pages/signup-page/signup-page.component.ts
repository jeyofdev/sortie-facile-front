import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationSignupMessages } from '@shared/validations/messages/signup-message.error';
import { passwordEqualValidator } from '@validators/password-equal.validator';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];
	regexEmail!: RegExp;

	mainForm!: FormGroup;
	passwordForm!: FormGroup;

	formError!: string;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;
	confirmPasswordCtrl!: FormControl;

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
		this.formError = '';
		console.log(this.mainForm.get('passwordForm')?.hasError('matchPassword')); // Vérifiez les erreurs sur le groupe

		if (this.mainForm.valid) {
			console.log(this.mainForm.value);
		} else {
			if (this.mainForm.get('passwordForm')?.hasError('matchPassword')) {
				this.formError =
					'Les champs de mot de passe ne correspondent pas. Veuillez vous assurer que le mot de passe et sa confirmation sont identiques.';
			} else {
				this.formError = 'Le formulaire contient des erreurs. Veuillez vérifier vos informations.';
			}
		}
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
			passwordForm: this.passwordForm,
		});
	}

	private initFormControls(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.emailCtrl = this._formBuilder.control('', [Validators.required, Validators.pattern(this.regexEmail)]);
		this.passwordCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(8)]);
		this.confirmPasswordCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(8)]);

		this.passwordForm = this._formBuilder.group(
			{
				password: this.passwordCtrl,
				confirmPassword: this.confirmPasswordCtrl,
			},
			{
				validators: [passwordEqualValidator],
			},
		);
	}
}
