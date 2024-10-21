import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { UpdateProfileInput } from '@shared/models/profile/input/update-profile-input.model';
import { FormName } from '@shared/types/form/form-name.type';
import { FormPersonalInfo } from '@shared/types/form/form-personal-info.type';
import { RegexHelper } from '@shared/utils/regex.helper';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
	selector: 'app-settings-profile-form',
	templateUrl: './settings-profile-form.component.html',
	styleUrl: './settings-profile-form.component.scss',
})
export class SettingsProfileFormComponent extends AccountSettingsPageAbstract<FormPersonalInfo> implements OnInit {
	@Input() isViewDatas!: boolean;

	nameForm!: FormGroup<FormName>;

	firstnameCtrl!: FormControl<string>;
	lastnameCtrl!: FormControl<string>;
	dateOfBirthCtrl!: FormControl<string>;

	constructor(
		protected override _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _profileService: ProfileService,
		private messageService: MessageService,
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
			const [day, month, year] = (this.mainForm.value?.dateOfBirth as string)?.split('/').map(Number);

			const updatedProfile = new UpdateProfileInput(
				this.mainForm.value.nameForm?.firstname as string,
				this.mainForm.value.nameForm?.lastname as string,
				new Date(year, month - 1, day + 1),
				this.resolvedProfile.address.streetNumber,
				this.resolvedProfile.address.street,
				Number(this.resolvedProfile.address.zipCode),
				this.resolvedProfile.contact.phone.split('-').join(''),
				this.resolvedProfile.contact.socialMedia.twitter,
				this.resolvedProfile.contact.socialMedia.instagram,
				this.resolvedProfile.contact.socialMedia.facebook,
				this.resolvedProfile.description,
				this.resolvedProfile.avatar,
				this.resolvedProfile.activities.results.map((activity: any) => activity.id),
			);

			this._profileService
				.updateById(updatedProfile)
				.pipe(tap(() => this.showToast()))
				.subscribe();
		} else {
			this.formError = 'The form contains errors. Please verify your information.';
		}
	}

	showToast() {
		this.messageService.add({
			severity: 'success',
			detail: 'Profil information has been saved successfully.',
			icon: 'pi pi-check',
		});
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			nameForm: this.nameForm,
			dateOfBirth: this.dateOfBirthCtrl,
		});
	}

	protected override initFormControls(): void {
		this.firstnameCtrl = this._formBuilder.control(this.resolvedProfile.name.firstname, {
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.lastnameCtrl = this._formBuilder.control(this.resolvedProfile.name.lastname, {
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(30)],
			nonNullable: true,
		});
		this.dateOfBirthCtrl = this._formBuilder.control(this.resolvedProfile.year.dateOfBirth, {
			validators: [Validators.required, Validators.pattern(RegexHelper.dateOfBirth)],
			nonNullable: true,
		});

		this.nameForm = this._formBuilder.group({
			firstname: this.firstnameCtrl,
			lastname: this.lastnameCtrl,
		});
	}
}
