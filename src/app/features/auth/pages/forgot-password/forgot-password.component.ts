import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseAuthError } from '@shared/models/auth/response-auth-error.model';
import { FormForgotPassword } from '@shared/types/form/form-forgot-password.type';
import { RegexHelper } from '@utils/regex.helper';
import { validationForgotPasswordMessages } from '@shared/validations/messages/forgot-password-message.error';
import { tap } from 'rxjs';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent extends AuthPageAbstract<FormForgotPassword> implements OnInit {
	formSuccess!: string;

	emailCtrl!: FormControl<string>;

	constructor(
		private _formBuilder: FormBuilder,
		private _authService: AuthService,
	) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.validationMessages = validationForgotPasswordMessages;

		super.ngOnInit();
	}

	override onSubmit(): void {
		this.formError = '';
		this.formSuccess = '';

		if (this.mainForm.valid) {
			this._authService
				.requestForgotPassword(this.mainForm.value.email as string)
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
			this.formError = 'The form contains errors. Please check your informations.';
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
		});
	}

	protected override initFormControls(): void {
		this.emailCtrl = this._formBuilder.control<string>('', {
			validators: [Validators.required, Validators.pattern(RegexHelper.email)],
			nonNullable: true,
		});
	}
}
