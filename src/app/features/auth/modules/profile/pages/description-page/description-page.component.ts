import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-description-page',
	templateUrl: './description-page.component.html',
	styleUrl: './description-page.component.scss',
})
export class DescriptionPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];

	mainForm!: FormGroup;
	descriptionCtrl!: FormControl;

	formError!: string;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _authStepService: AuthStepService,
	) {}

	ngOnInit(): void {
		this.validationMessages = validationAuthProfileMessages;

		this.initFormControls();
		this.initSignupForm();
	}

	getValidationMessages(name: string): ValidationMessage | null {
		try {
			const validationMessage: ValidationMessages = this.validationMessages.find(
				vm => vm.getName() === name,
			) as ValidationMessages;

			if (!validationMessage) {
				throw new Error(`Validation messages not found for name: ${name}`);
			}

			return validationMessage.getMessages();
		} catch (err) {
			console.error(err);
			return null;
		}
	}

	onSubmit(): void {
		console.log('Form Value:', this.mainForm.value);
		console.log('Form Value:', this.mainForm);

		if (this.mainForm.valid) {
			this._authStepService.setStepData('step3', this.mainForm.value);
			console.log(this._authStepService.getAllData());

			this._router.navigateByUrl(
				PrimaryRouteEnum.AUTH +
					'/' +
					AuthRouteEnum.SIGNUP +
					'/' +
					PrimaryRouteEnum.PROFILE +
					'/' +
					AuthProfileEnum.DESCRIPTION,
			);
		}
	}

	backToPreviousStep(): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.AUTH +
				'/' +
				AuthRouteEnum.SIGNUP +
				'/' +
				PrimaryRouteEnum.PROFILE +
				'/' +
				AuthProfileEnum.CONTACT,
		);
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			description: this.descriptionCtrl,
		});
	}

	private initFormControls(): void {
		this.descriptionCtrl = this._formBuilder.control('', [Validators.required, Validators.minLength(20)]);
	}
}
