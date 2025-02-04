import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthProfileRouteEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { StepAuthRegister } from '@shared/models/auth/steps/step-auth-register.model';
import { FormPassword } from '@shared/types/form/form-password.type';
import { FormSignup } from '@shared/types/form/form-signup.type';
import { RegexHelper } from '@utils/regex.helper';
import { validationSignupMessages } from '@shared/validations/messages/signup-message.error';
import { passwordEqualValidator } from '@validators/password-equal.validator';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent extends AuthPageAbstract<FormSignup> implements OnInit {
	passwordForm!: FormGroup<FormPassword>;

	emailCtrl!: FormControl<string>;
	passwordCtrl!: FormControl<string>;
	confirmPasswordCtrl!: FormControl<string>;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _authStepService: AuthStepService,
	) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.validationMessages = validationSignupMessages;

		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';
		if (this.mainForm.valid) {
			this._authStepService.setStepData(
				'step1',
				new StepAuthRegister(
					this.mainForm.value.email as string,
					this.mainForm.value?.passwordForm?.password as string,
				),
			);

			this._router.navigateByUrl(
				PrimaryRouteEnum.AUTH +
					'/' +
					AuthRouteEnum.SIGNUP +
					'/' +
					PrimaryRouteEnum.PROFILE +
					'/' +
					AuthProfileRouteEnum.PERSONAL,
			);
		} else {
			if (this.mainForm.get('passwordForm')?.hasError('matchPassword')) {
				this.formError =
					'Password fields not matching. Please make sure the password and its confirmation are the same.';
			} else {
				this.formError = 'The form contains errors. Please verify your information.';
			}
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
			passwordForm: this.passwordForm,
		});
	}

	protected override initFormControls(): void {
		this.emailCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(RegexHelper.email)],
			nonNullable: true,
		});
		this.passwordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});
		this.confirmPasswordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});

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
