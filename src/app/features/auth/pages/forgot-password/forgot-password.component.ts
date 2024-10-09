import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthPageAbstract } from '@shared/abstract/auth-page.abstract';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { FormForgotPassword } from '@shared/types/form/form-forgot-password.type';
import { validationForgotPasswordMessages } from '@shared/validations/messages/forgot-password-message.error';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent extends AuthPageAbstract<FormForgotPassword> implements OnInit {
	regexEmail!: RegExp;

	emailCtrl!: FormControl<string>;

	constructor(private _formBuilder: FormBuilder) {
		super();
	}

	override ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.validationMessages = validationForgotPasswordMessages;

		super.ngOnInit();
	}

	override onSubmit(): void {
		console.log(this.mainForm);
		console.log(this.mainForm.value);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			email: this.emailCtrl,
		});
	}

	protected override initFormControls(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.emailCtrl = this._formBuilder.control<string>('', {
			validators: [Validators.required, Validators.pattern(this.regexEmail)],
			nonNullable: true,
		});
	}
}
