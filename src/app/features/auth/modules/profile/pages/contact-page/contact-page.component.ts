import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { StepAuthProfileContact } from '@shared/models/auth/steps/step-auth-profile-contact.model';
import { FormContact } from '@shared/types/form/form-contact.type';
import { FormSocial } from '@shared/types/form/form-social.type';
import { RegexHelper } from '@utils/regex.helper';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent extends AuthProfilePage<FormContact> implements OnInit {
	socialForm!: FormGroup<FormSocial>;

	phoneCtrl!: FormControl<string>;
	twitterCtrl!: FormControl<string>;
	instagramCtrl!: FormControl<string>;
	facebookCtrl!: FormControl<string>;

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
			'step4',
			new StepAuthProfileContact(
				this.mainForm.value.phone as string,
				this.mainForm.value?.socialForm?.twitter as string,
				this.mainForm.value?.socialForm?.instagram as string,
				this.mainForm.value?.socialForm?.facebook as string,
			),
			AuthProfileEnum.DESCRIPTION,
		);
	}

	override backToPreviousStep(): void {
		super.backToPreviousStep(AuthProfileEnum.ADDRESS);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			phone: this.phoneCtrl,
			socialForm: this.socialForm,
		});
	}

	protected override initFormControls(): void {
		this.phoneCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.pattern(RegexHelper.phone)],
			nonNullable: true,
		});
		this.twitterCtrl = this._formBuilder.control('', {
			validators: [Validators.minLength(3), Validators.minLength(3), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.instagramCtrl = this._formBuilder.control('', {
			validators: [Validators.minLength(3), Validators.minLength(3), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.facebookCtrl = this._formBuilder.control('', {
			validators: [Validators.minLength(3), Validators.minLength(3), Validators.maxLength(30)],
			nonNullable: true,
		});

		this.socialForm = this._formBuilder.group({
			twitter: this.twitterCtrl,
			instagram: this.instagramCtrl,
			facebook: this.facebookCtrl,
		});
	}
}
