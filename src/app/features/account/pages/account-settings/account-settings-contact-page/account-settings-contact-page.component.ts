import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { UpdateProfileInput } from '@shared/models/profile/input/update-profile-input.model';
import { FormContact } from '@shared/types/form/form-contact.type';
import { FormSocial } from '@shared/types/form/form-social.type';
import { DateHelper } from '@shared/utils/date-helper';
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

	constructor(
		protected override _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _profileService: ProfileService,
	) {
		super(_activatedRoute);
	}

	override ngOnInit(): void {
		this.validationMessages = validationAccountMessages;
		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';

		if (this.mainForm.valid) {
			const [day, month, year] = this.resolvedProfile.year.dateOfBirth.split('-').map(Number);

			const updatedProfile = new UpdateProfileInput(
				this.resolvedProfile.name.firstname,
				this.resolvedProfile.name.lastname,
				new Date(year, month - 1, day + 1),
				this.resolvedProfile.address.streetNumber,
				this.resolvedProfile.address.street,
				Number(this.resolvedProfile.address.zipCode),
				(this.mainForm.value.phone as string).replace(/-/g, ''),
				this.mainForm.value.socialForm?.twitter as string,
				this.mainForm.value.socialForm?.instagram as string,
				this.mainForm.value.socialForm?.facebook as string,
				this.resolvedProfile.description,
				this.resolvedProfile.avatar,
				this.resolvedProfile.activities.results.map((activity: any) => activity.id),
			);

			this._profileService.updateById(updatedProfile).subscribe();
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
		this.phoneCtrl = this._formBuilder.control(this.resolvedProfile.contact.phone, {
			validators: [Validators.required, Validators.pattern(RegexHelper.phone)],
			nonNullable: true,
		});
		this.twitterCtrl = this._formBuilder.control(this.resolvedProfile.contact.socialMedia.twitter, {
			validators: [Validators.minLength(3), Validators.minLength(3), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.instagramCtrl = this._formBuilder.control(this.resolvedProfile.contact.socialMedia.instagram, {
			validators: [Validators.minLength(3), Validators.minLength(3), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.facebookCtrl = this._formBuilder.control(this.resolvedProfile.contact.socialMedia.facebook, {
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
