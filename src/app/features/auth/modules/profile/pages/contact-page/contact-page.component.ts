import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-contact-page',
	templateUrl: './contact-page.component.html',
	styleUrl: './contact-page.component.scss',
})
export class ContactPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];

	mainForm!: FormGroup;
	socialForm!: FormGroup;

	phoneCtrl!: FormControl;
	twitterCtrl!: FormControl;
	instagramCtrl!: FormControl;
	facebookCtrl!: FormControl;

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
					AuthProfileEnum.CONTACT,
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
				AuthProfileEnum.ADDRESS,
		);
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			phone: this.phoneCtrl,
			socialForm: this.socialForm,
		});
	}

	private initFormControls(): void {
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
