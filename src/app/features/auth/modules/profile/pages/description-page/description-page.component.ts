import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-description-page',
	templateUrl: './description-page.component.html',
	styleUrl: './description-page.component.scss',
})
export class DescriptionPageComponent extends AuthProfilePage implements OnInit {
	descriptionCtrl!: FormControl;

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
		super.backToPreviousStep(AuthProfileEnum.CONTACT);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			description: this.descriptionCtrl,
		});
	}

	protected override initFormControls(): void {
		this.descriptionCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(20)]);
	}
}
