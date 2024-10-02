import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { Department } from '@shared/models/address/department.interface';
import { Region } from '@shared/models/address/region.interface';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';

@Component({
	selector: 'app-address-page',
	templateUrl: './address-page.component.html',
	styleUrl: './address-page.component.scss',
})
export class AddressPageComponent implements OnInit {
	validationMessages!: ValidationMessages[];

	mainForm!: FormGroup;
	streetForm!: FormGroup;

	streetNumberCtrl!: FormControl;
	streetCtrl!: FormControl;
	regionCtrl!: FormControl;
	departmentCtrl!: FormControl;

	formError!: string;
	step1Data!: string;

	regionItems: Region[] = [
		{ id: '1', name: 'auvergne-rhône-alpes' },
		{ id: '2', name: 'bourgogne-franche-comté' },
		{ id: '3', name: 'bretagne' },
		{ id: '4', name: 'nouvelle-aquitaine' },
		{ id: '5', name: 'occitanie' },
	];

	departmentItems: Department[] = [
		{ id: '1', name: 'gironde' },
		{ id: '2', name: 'alpes-de-haute-provence' },
		{ id: '3', name: 'landes' },
		{ id: '4', name: 'loire' },
		{ id: '5', name: 'corrèze' },
	];

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _authStepService: AuthStepService,
	) {}

	ngOnInit(): void {
		this.validationMessages = validationAuthProfileMessages;
		this.step1Data = this._authStepService.getStepData('step1');

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
			this._authStepService.setStepData('step2', this.mainForm.value);
			console.log(this._authStepService.getAllData());

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
	}

	backToPreviousStep(): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.AUTH +
				'/' +
				AuthRouteEnum.SIGNUP +
				'/' +
				PrimaryRouteEnum.PROFILE +
				'/' +
				AuthProfileEnum.PERSONAL,
		);
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			streetForm: this.streetForm,
			region: this.regionCtrl,
			department: this.departmentCtrl,
		});
	}

	private initFormControls(): void {
		this.streetNumberCtrl = this._formBuilder.control('', [Validators.required]);
		this.streetCtrl = this._formBuilder.control('', [Validators.required]);
		this.regionCtrl = this._formBuilder.control('', [Validators.required]);
		this.departmentCtrl = this._formBuilder.control('', [Validators.required]);

		this.streetForm = this._formBuilder.group({
			streetNumber: this.streetNumberCtrl,
			street: this.streetCtrl,
		});
	}
}
