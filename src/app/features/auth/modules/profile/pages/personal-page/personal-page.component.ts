import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-personal-page',
	templateUrl: './personal-page.component.html',
	styleUrl: './personal-page.component.scss',
})
export class PersonalPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];
	regexDate!: RegExp;

	mainForm!: FormGroup;
	nameForm!: FormGroup;

	firstnameCtrl!: FormControl;
	lastnameCtrl!: FormControl;
	dateOfBirthCtrl!: FormControl;

	formError!: string;

	redirectLink!: string;

	constructor(private _formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
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
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			nameForm: this.nameForm,
			dateOfBirth: this.dateOfBirthCtrl,
		});
	}

	private initFormControls(): void {
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