import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseAuthSigninBase } from '@shared/models/auth/response-auth-signin-base.model';
import { ResponseAuthSigninError } from '@shared/models/auth/response-auth-signin-error.model';
import { validationSigninMessages } from '@shared/validations/messages/signin-message.error';
import { Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent extends AuthPageAbstract implements OnInit, OnDestroy {
	private _signinSubscription: Subscription = new Subscription();

	regexEmail!: RegExp;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
		private _localStorageService: LocalStorageService,
	) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP;
		this.validationMessages = validationSigninMessages;

		super.ngOnInit();
	}

	override onSubmit(): void {
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
			this.formError = 'The form contains errors. Please check your informations.';
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	protected override initFormControls(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.emailCtrl = this._formBuilder.control('', [Validators.required, Validators.pattern(this.regexEmail)]);
		this.passwordCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(8)]);
	}

	ngOnDestroy(): void {
		this._signinSubscription.unsubscribe();
	}
}
