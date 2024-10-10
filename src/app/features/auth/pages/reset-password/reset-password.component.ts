import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseAuthError } from '@shared/models/auth/response-auth-error.model';
import { FormPassword } from '@shared/types/form/form-password.type';
import { validationForgotPasswordMessages } from '@shared/validations/messages/forgot-password-message.error';
import { passwordEqualValidator } from '@shared/validations/validators/password-equal.validator';
import { tap } from 'rxjs';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent extends AuthPageAbstract<FormPassword> implements OnInit {
	passwordCtrl!: FormControl<string>;
	confirmPasswordCtrl!: FormControl<string>;

	formSuccess!: string;
	resetToken: string | null = null;

	constructor(
		private _formBuilder: FormBuilder,
		private _route: ActivatedRoute,
		private _authService: AuthService,
	) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.validationMessages = validationForgotPasswordMessages;

		this._route.queryParams.subscribe(params => {
			this.resetToken = params['resetToken'];
		});

		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';
		this.formSuccess = '';

		if (!this.resetToken) {
			this.formError = 'No token value was found in the URL. Please provide a valid token.';
		} else {
			if (this.mainForm.valid) {
				this._authService
					.resetPassword(this.resetToken as string, this.mainForm.value.password as string)
					.pipe(
						tap((res: ResponseAuthBase) => {
							if (res instanceof ResponseAuthError) {
								this.formError = res.message;
							} else {
								this.formSuccess = res.message;
							}
						}),
					)
					.subscribe();
			} else {
				if (this.mainForm?.hasError('matchPassword')) {
					this.formError =
						'Password fields not matching. Please make sure the password and its confirmation are the same.';
				} else {
					this.formError = 'The form contains errors. Please verify your information.';
				}
			}
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group(
			{
				password: this.passwordCtrl,
				confirmPassword: this.confirmPasswordCtrl,
			},
			{
				validators: [passwordEqualValidator],
			},
		);
	}

	protected override initFormControls(): void {
		this.passwordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});
		this.confirmPasswordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});
	}
}
