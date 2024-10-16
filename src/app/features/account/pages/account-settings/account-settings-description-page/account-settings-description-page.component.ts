import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { NewProfileData } from '@shared/models/profile/new-profile-data.model';
import { ResponseAddProfile } from '@shared/models/profile/response-add-profile.model';
import { FormDescription } from '@shared/types/form/form-description.type';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';
import { first } from 'rxjs';

@Component({
	selector: 'app-account-settings-description-page',
	templateUrl: './account-settings-description-page.component.html',
	styleUrl: './account-settings-description-page.component.scss',
})
export class AccountSettingsDescriptionPageComponent
	extends AccountSettingsPageAbstract<FormDescription>
	implements OnInit
{
	descriptionCtrl!: FormControl<string>;
	resolvedProfile!: ResponseAddProfile;

	constructor(
		private _formBuilder: FormBuilder,
		private _profileService: ProfileService,
		private _activatedRoute: ActivatedRoute,
	) {
		super();
	}

	override ngOnInit(): void {
		this.validationMessages = validationAccountMessages;

		this._activatedRoute.parent?.data.pipe(first()).subscribe(data => {
			this.resolvedProfile = data['profile'];
		});

		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';
		if (this.mainForm.valid) {
			const updatedProfile = new NewProfileData(
				this.resolvedProfile.name.firstname,
				this.resolvedProfile.name.lastname,
				new Date(this.resolvedProfile.year.dateOfBirth),
				this.resolvedProfile.address.streetNumber,
				this.resolvedProfile.address.street,
				Number(this.resolvedProfile.address.zipCode),
				this.resolvedProfile.contact.phone.split('-').join(''),
				this.resolvedProfile.contact.socialMedia.twitter,
				this.resolvedProfile.contact.socialMedia.instagram,
				this.resolvedProfile.contact.socialMedia.facebook,
				this.mainForm.value.description as string,
				this.resolvedProfile.avatar,
				this.resolvedProfile.activities.results.map((activity: any) => activity.id),
			);
			// TODO save new description
			this._profileService.updateById(updatedProfile).subscribe();
		} else {
			this.formError = 'The form contains errors. Please verify your information.';
		}
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			description: this.descriptionCtrl,
		});
	}

	protected override initFormControls(): void {
		this.descriptionCtrl = this._formBuilder.control(this.resolvedProfile.description, {
			validators: [Validators.required, Validators.minLength(20)],
			nonNullable: true,
		});
	}
}
