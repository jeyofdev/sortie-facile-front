import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '@services/address.service';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { City } from '@shared/models/address/city.interface';
import { Department } from '@shared/models/address/department.interface';
import { Region } from '@shared/models/address/region.model';
import { ValidationMessages } from '@shared/models/validation-messages.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';
import { Observable, of } from 'rxjs';

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
	cityCtrl!: FormControl;

	formError!: string;
	step1Data!: string;

	regionItems$: Observable<Region[]> = of([]);
	departmentItems$: Observable<Department[]> = of([]);
	cityItems$: Observable<City[]> = of([]);

	selectedRegion$!: Observable<Region | null>;
	selectedDepartment$!: Observable<Department | null>;

	constructor(
		private _formBuilder: FormBuilder,
		private _router: Router,
		private _authStepService: AuthStepService,
		private _addressService: AddressService,
	) {}

	ngOnInit(): void {
		this.regionItems$ = this._addressService.getAllRegions();

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
				AuthProfileEnum.PERSONAL,
		);
	}

	private initSignupForm() {
		this.mainForm = this._formBuilder.group({
			streetForm: this.streetForm,
			region: this.regionCtrl,
			department: this.departmentCtrl,
			city: this.cityCtrl,
		});
	}

	private initFormControls(): void {
		this.streetNumberCtrl = this._formBuilder.control('', [Validators.required]);
		this.streetCtrl = this._formBuilder.control('', [Validators.required]);
		this.regionCtrl = this._formBuilder.control('', [Validators.required]);
		this.departmentCtrl = this._formBuilder.control('', [Validators.required]);
		this.cityCtrl = this._formBuilder.control('', [Validators.required]);

		this.streetForm = this._formBuilder.group({
			streetNumber: this.streetNumberCtrl,
			street: this.streetCtrl,
		});
	}

	onRegionSelected(region: Region): void {
		this.departmentCtrl.reset();
		this.cityCtrl.reset();

		this.selectedRegion$ = of(region);

		this.departmentItems$ = this._addressService.getDepartmentsByRegion(region.id);
		this.cityItems$ = of([]);
	}

	onDepartmentSelected(department: Department): void {
		this.cityCtrl.reset();
		this.selectedDepartment$ = of(department);

		this.cityItems$ = this._addressService.getCitiesByDepartment(department.id);
	}
}
