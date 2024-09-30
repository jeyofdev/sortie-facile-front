import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { ResponseAuthSigninBase } from '@shared/models/auth/response-auth-signin-base.model';
import { ResponseAuthSigninError } from '@shared/models/auth/response-auth-signin-error.model';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationLoginMessages } from '@shared/validations/messages/login-message.error';
import { map, Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent implements OnInit, OnDestroy {
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
		private _localStorageService: LocalStorageService,
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
			this._localStorageService.clearAuthToken();

			this._signinSubscription = this._authService
				.signInWithEmailAndPassword$(this.mainForm.value)
				.pipe(
					tap((res: ResponseAuthSigninBase) => {
						if (res instanceof ResponseAuthSigninError) {
							this.formError = res.message;
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

	ngOnDestroy(): void {
		this._signinSubscription.unsubscribe();
	}
}
