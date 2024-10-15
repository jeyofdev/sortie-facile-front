import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { FormDescription } from '@shared/types/form/form-description.type';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';

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
			// TODO save new description
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
		this.descriptionCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(20)],
			nonNullable: true,
		});
	}
}
