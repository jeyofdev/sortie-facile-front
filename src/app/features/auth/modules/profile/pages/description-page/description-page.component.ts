import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileRouteEnum } from '@shared/enums/routes.enum';
import { StepAuthProfileDescription } from '@shared/models/auth/steps/step-auth-profile-description.model';
import { FormDescription } from '@shared/types/form/form-description.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-description-page',
	templateUrl: './description-page.component.html',
	styleUrl: './description-page.component.scss',
})
export class DescriptionPageComponent extends AuthProfilePage<FormDescription> implements OnInit {
	descriptionCtrl!: FormControl<string>;

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
			'step5',
			new StepAuthProfileDescription(this.mainForm.value.description as string),
			AuthProfileRouteEnum.INTERESTS,
		);
	}

	override backToPreviousStep(): void {
		super.backToPreviousStep(AuthProfileRouteEnum.CONTACT);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			description: this.descriptionCtrl,
		});
	}

	protected override initFormControls(): void {
		this.descriptionCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(20)],
			nonNullable: true,
		});
	}
}
