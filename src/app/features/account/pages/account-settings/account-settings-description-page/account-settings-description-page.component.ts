import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '@services/profile.service';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { UpdateProfileInput } from '@shared/models/profile/input/update-profile-input.model';
import { FormDescription } from '@shared/types/form/form-description.type';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
	selector: 'app-account-settings-description-page',
	templateUrl: './account-settings-description-page.component.html',
	styleUrl: './account-settings-description-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsDescriptionPageComponent
	extends AccountSettingsPageAbstract<FormDescription>
	implements OnInit
{
	isViewDatas!: boolean;

	descriptionCtrl!: FormControl<string>;

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
		this.isViewDatas = true;

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
				this.resolvedProfile.contact.phone.split('-').join(''),
				this.resolvedProfile.contact.socialMedia.twitter,
				this.resolvedProfile.contact.socialMedia.instagram,
				this.resolvedProfile.contact.socialMedia.facebook,
				this.mainForm.value.description as string,
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

	showIsViewDatas(isViewDatas: boolean): void {
		this.isViewDatas = isViewDatas;
	}

	showToast() {
		this.messageService.add({
			severity: 'success',
			detail: 'The description has been saved successfully.',
			icon: 'pi pi-check',
		});
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
