import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent extends AuthProfilePage implements OnInit {
	socialForm!: FormGroup;

	phoneCtrl!: FormControl;
	twitterCtrl!: FormControl;
	instagramCtrl!: FormControl;
	facebookCtrl!: FormControl;

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
		super.onSubmit('step3', AuthProfileEnum.DESCRIPTION);
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
		this.phoneCtrl = this._formBuilder.control('', [Validators.required]);
		this.twitterCtrl = this._formBuilder.control('', [Validators.minLength(3)]);
		this.instagramCtrl = this._formBuilder.control('', [Validators.minLength(3)]);
		this.facebookCtrl = this._formBuilder.control('', [Validators.minLength(3)]);

		this.socialForm = this._formBuilder.group({
			twitter: this.twitterCtrl,
			instagram: this.instagramCtrl,
			facebook: this.facebookCtrl,
		});
	}
}
