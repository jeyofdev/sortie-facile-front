import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-personal-page',
	templateUrl: './personal-page.component.html',
	styleUrl: './personal-page.component.scss',
})
export class PersonalPageComponent extends AuthProfilePage implements OnInit {
	regexDate!: RegExp;

	nameForm!: FormGroup;

	firstnameCtrl!: FormControl;
	lastnameCtrl!: FormControl;
	dateOfBirthCtrl!: FormControl;

	constructor(
		private _formBuilder: FormBuilder,
		_router: Router,
		_authStepService: AuthStepService,
	) {
		super(_router, _authStepService);
	}

	override ngOnInit(): void {
		this.validationMessages = validationAuthProfileMessages;
		super.ngOnInit();
	}

	override onSubmit(): void {
		super.onSubmit('step1', AuthProfileEnum.ADDRESS);
	}

	protected override initSignupForm() {
		this.mainForm = this._formBuilder.group({
			nameForm: this.nameForm,
			dateOfBirth: this.dateOfBirthCtrl,
		});
	}

	protected override initFormControls(): void {
		this.regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

		this.firstnameCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(8)]);
		this.lastnameCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(8)]);
		this.dateOfBirthCtrl = this._formBuilder.control('', [Validators.required, Validators.pattern(this.regexDate)]);

		this.nameForm = this._formBuilder.group({
			firstname: this.firstnameCtrl,
			lastname: this.lastnameCtrl,
		});
	}
}
