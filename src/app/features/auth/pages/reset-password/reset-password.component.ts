import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { FormPassword } from '@shared/types/form/form-password.type';
import { validationForgotPasswordMessages } from '@shared/validations/messages/forgot-password-message.error';
import { passwordEqualValidator } from '@shared/validations/validators/password-equal.validator';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent extends AuthPageAbstract<FormPassword> implements OnInit {
	passwordCtrl!: FormControl<string>;
	confirmPasswordCtrl!: FormControl<string>;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
	) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.validationMessages = validationForgotPasswordMessages;

		super.ngOnInit();
	}

	onSubmit(): void {
		console.log(this.mainForm);

		this.formError = '';

		if (this.mainForm.valid) {
			console.log(this.mainForm.value);
		} else {
			if (this.mainForm?.hasError('matchPassword')) {
				this.formError =
					'Password fields not matching. Please make sure the password and its confirmation are the same.';
			} else {
				this.formError = 'The form contains errors. Please verify your information.';
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
