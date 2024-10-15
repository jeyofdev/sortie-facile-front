import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { FormContact } from '@shared/types/form/form-contact.type';
import { FormSocial } from '@shared/types/form/form-social.type';
import { RegexHelper } from '@shared/utils/regex.helper';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';

@Component({
	selector: 'app-account-settings-contact-page',
	templateUrl: './account-settings-contact-page.component.html',
	styleUrl: './account-settings-contact-page.component.scss',
})
export class AccountSettingsContactPageComponent extends AccountSettingsPageAbstract<FormContact> implements OnInit {
	socialForm!: FormGroup<FormSocial>;

	phoneCtrl!: FormControl<string>;
	twitterCtrl!: FormControl<string>;
	instagramCtrl!: FormControl<string>;
	facebookCtrl!: FormControl<string>;

	constructor(private _formBuilder: FormBuilder) {
		super();
	}

	override ngOnInit(): void {
		this.validationMessages = validationAccountMessages;
		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';
		if (this.mainForm.valid) {
			console.log(this.mainForm);
			// TODO save contact and social media
		} else {
			this.formError = 'The form contains errors. Please verify your information.';
		}
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
