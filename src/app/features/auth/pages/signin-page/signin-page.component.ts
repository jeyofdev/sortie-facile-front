import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { ResponseAuthSigninBase } from '@shared/models/auth/response-auth-signin-base.model';
import { ResponseAuthSigninError } from '@shared/models/auth/response-auth-signin-error.model';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationLoginMessages } from '@shared/validations/messages/login-message.error';
import { map, Subscription } from 'rxjs';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent implements OnInit {
	private _signinSubscription: Subscription = new Subscription();

	formIsSubmitted: boolean = false;
	validationMessages!: ValidationMessages[];
	regexEmail!: RegExp;

	mainForm!: FormGroup;
	formError!: string;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
	) {}

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
		if (this.mainForm.valid) {
			this.formError = '';

			this._signinSubscription = this._authService
				.signInWithEmailAndPassword$(this.mainForm.value)
				.pipe(
					map((res: ResponseAuthSigninBase) => {
						if (res instanceof ResponseAuthSigninError) {
							this.formError = res.message;
						} else {
							console.log('Response : ', res);
						}
					}),
				)
				.subscribe();
		} else {
			this.formError = 'The form contains errors. Please check your login informations.';
		}
	}

	private initLoginForm() {
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
