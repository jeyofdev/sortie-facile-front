import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseError } from '@shared/models/auth/response-auth-error.model';
import { FormAccountPassword } from '@shared/types/form/form-account-password.type';
import { FormPassword } from '@shared/types/form/form-password.type';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';
import { passwordEqualValidator } from '@shared/validations/validators/password-equal.validator';
import { MessageService } from 'primeng/api';
import { tap } from 'rxjs';

@Component({
	selector: 'app-settings-password-form',
	templateUrl: './settings-password-form.component.html',
	styleUrl: './settings-password-form.component.scss',
})
export class SettingsPasswordFormComponent extends AccountSettingsPageAbstract<FormAccountPassword> implements OnInit {
	@Input({ required: true }) isViewDatas!: boolean;
	@Input({ required: true }) isViewDataChecked!: boolean;

	passwordForm!: FormGroup<FormPassword>;

	oldPasswordCtrl!: FormControl<string>;
	passwordCtrl!: FormControl<string>;
	confirmPasswordCtrl!: FormControl<string>;

	constructor(
		private _formBuilder: FormBuilder,
		protected override _activatedRoute: ActivatedRoute,
		private _authService: AuthService,
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
			this._authService
				.updatePassword(this.mainForm.value.oldPassword as string, this.mainForm.value.passwordForm?.password as string)
				.pipe(
					tap((res: ResponseAuthBase) => {
						if (res instanceof ResponseError) {
							this.formError = res.message;
						}
					}),
				)
				.pipe(tap((response: ResponseAuthBase) => this.showToast(response.message)))
				.subscribe();
		} else {
			if (this.mainForm.get('passwordForm')?.hasError('matchPassword')) {
				this.formError =
					'Password fields not matching. Please make sure the password and its confirmation are the same.';
			} else {
				this.formError = 'The form contains errors. Please verify your information.';
			}
		}
	}

	showToast(message: string) {
		this.messageService.add({
			severity: 'success',
			detail: message,
			icon: 'pi pi-check',
		});
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			oldPassword: this.oldPasswordCtrl,
			passwordForm: this.passwordForm,
		});
	}

	protected override initFormControls(): void {
		this.oldPasswordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});
		this.passwordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});
		this.confirmPasswordCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(8)],
			nonNullable: true,
		});

		this.passwordForm = this._formBuilder.group(
			{
				password: this.passwordCtrl,
				confirmPassword: this.confirmPasswordCtrl,
			},
			{
				validators: [passwordEqualValidator],
			},
		);
	}
}
