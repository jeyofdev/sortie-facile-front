import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { StepAuthProfilePersonnalInfo } from '@shared/models/auth/steps/step-auth-profile-personal-infos.model';
import { FormName } from '@shared/types/form/form-name.type';
import { FormPersonalInfo } from '@shared/types/form/form-personal-info.type';
import { RegexHelper } from '@utils/regex.helper';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-personal-page',
	templateUrl: './personal-page.component.html',
	styleUrl: './personal-page.component.scss',
})
export class PersonalPageComponent extends AuthProfilePage<FormPersonalInfo> implements OnInit {
	nameForm!: FormGroup<FormName>;

	firstnameCtrl!: FormControl<string>;
	lastnameCtrl!: FormControl<string>;
	dateOfBirthCtrl!: FormControl<string>;

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
		super.onSubmit(
			'step2',
			new StepAuthProfilePersonnalInfo(
				this.mainForm.value?.nameForm?.firstname as string,
				this.mainForm.value?.nameForm?.firstname as string,
				this.mainForm.value.dateOfBirth as string,
			),
			AuthProfileEnum.ADDRESS,
		);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			nameForm: this.nameForm,
			dateOfBirth: this.dateOfBirthCtrl,
		});
	}

	protected override initFormControls(): void {
		this.firstnameCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.lastnameCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.dateOfBirthCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(RegexHelper.dateOfBirth)],
			nonNullable: true,
		});

		this.nameForm = this._formBuilder.group({
			firstname: this.firstnameCtrl,
			lastname: this.lastnameCtrl,
		});
	}
}
