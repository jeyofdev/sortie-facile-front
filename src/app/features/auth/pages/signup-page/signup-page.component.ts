import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { StepAuthRegister } from '@shared/models/auth/steps/step-auth-register.model';
import { validationSignupMessages } from '@shared/validations/messages/signup-message.error';
import { passwordEqualValidator } from '@validators/password-equal.validator';

@Component({
	selector: 'app-signup-page',
	templateUrl: './signup-page.component.html',
	styleUrl: './signup-page.component.scss',
})
export class SignupPageComponent extends AuthPageAbstract implements OnInit {
	regexEmail!: RegExp;

	passwordForm!: FormGroup;

	emailCtrl!: FormControl;
	passwordCtrl!: FormControl;
	confirmPasswordCtrl!: FormControl;

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
				new StepAuthRegister(this.mainForm.value.email, this.mainForm.value.passwordForm.password),
			);

			this._router.navigateByUrl(
				PrimaryRouteEnum.AUTH +
					'/' +
					AuthRouteEnum.SIGNUP +
					'/' +
					PrimaryRouteEnum.PROFILE +
					'/' +
					AuthProfileEnum.PERSONAL,
			);
		} else {
			if (this.mainForm.get('passwordForm')?.hasError('matchPassword')) {
				this.formError =
					'Les champs de mot de passe ne correspondent pas. Veuillez vous assurer que le mot de passe et sa confirmation sont identiques.';
			} else {
				this.formError = 'Le formulaire contient des erreurs. Veuillez vérifier vos informations.';
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
