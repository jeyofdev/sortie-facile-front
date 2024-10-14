import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { LocalStorageService } from '@services/local-storage.service';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AccountEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { AuthUserCredential } from '@shared/models/auth/auth-user-credential.model';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseAuthError } from '@shared/models/auth/response-auth-error.model';
import { FormAuthBase } from '@shared/types/form/form-auth-base.type';
import { RegexHelper } from '@utils/regex.helper';
import { validationSigninMessages } from '@shared/validations/messages/signin-message.error';
import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-signin-page',
	templateUrl: './signin-page.component.html',
	styleUrl: './signin-page.component.scss',
})
export class SigninPageComponent extends AuthPageAbstract<FormAuthBase> implements OnInit, OnDestroy {
	private _signinSubscription: Subscription = new Subscription();

	forgotPasswordLink!: string;

	emailCtrl!: FormControl<string>;
	passwordCtrl!: FormControl<string>;

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
		private _localStorageService: LocalStorageService,
		private _router: Router,
	) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP;
		this.forgotPasswordLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.FORGOT_PASSWORD;
		this.validationMessages = validationSigninMessages;

		super.ngOnInit();
	}

	override onSubmit(): void {
		if (this.mainForm.valid) {
			this.formError = '';
			this._localStorageService.clearAuthToken();

			this._signinSubscription = this._authService
				.signInWithEmailAndPassword$(
					new AuthUserCredential(this.mainForm.value.email as string, this.mainForm.value.password as string),
				)
				.pipe(
					tap((res: ResponseAuthBase) => {
						if (res instanceof ResponseAuthError) {
							this.formError = res.message;
						} else {
							this._router.navigateByUrl('/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountEnum.HOME);
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
		this.emailCtrl = this._formBuilder.control<string>('', {
			validators: [Validators.required, Validators.pattern(RegexHelper.email)],
			nonNullable: true,
		});
		this.passwordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});
	}

	ngOnDestroy(): void {
		this._signinSubscription.unsubscribe();
	}
}
