import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '@services/address.service';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { City } from '@shared/models/address/city.interface';
import { Department } from '@shared/models/address/department.interface';
import { Region } from '@shared/models/address/region.model';
import { StepAuthProfileAddress } from '@shared/models/auth/steps/step-auth-profile-address.model';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-address-page',
	templateUrl: './address-page.component.html',
	styleUrl: './address-page.component.scss',
})
export class AddressPageComponent extends AuthProfilePage implements OnInit {
	streetForm!: FormGroup;

	streetNumberCtrl!: FormControl;
	streetCtrl!: FormControl;
	regionCtrl!: FormControl;
	departmentCtrl!: FormControl;
	cityCtrl!: FormControl;

	step1Data!: string;

	regionItems$: Observable<Region[]> = of([]);
	departmentItems$: Observable<Department[]> = of([]);
	cityItems$: Observable<City[]> = of([]);

	selectedRegion$!: Observable<Region | null>;
	selectedDepartment$!: Observable<Department | null>;

	constructor(
		private _formBuilder: FormBuilder,
		_router: Router,
		_authStepService: AuthStepService,
		private _addressService: AddressService,
	) {
		super(_router, _authStepService);
	}

	override ngOnInit(): void {
		this.regionItems$ = this._addressService.getAllRegions();

		this.validationMessages = validationAuthProfileMessages;
		// this.step1Data = this._authStepService.getStepData('step1');

		super.ngOnInit();
	}

	override onSubmit(): void {
		super.onSubmit(
			'step2',
			new StepAuthProfileAddress(
				this.mainForm.value.streetForm.streetNumber,
				this.mainForm.value.streetForm.street,
				this.mainForm.value.region,
				this.mainForm.value.department,
				this.mainForm.value.city,
			),
			AuthProfileEnum.CONTACT,
		);
	}

	override backToPreviousStep(): void {
		super.backToPreviousStep(AuthProfileEnum.PERSONAL);
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

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			streetForm: this.streetForm,
			region: this.regionCtrl,
			department: this.departmentCtrl,
			city: this.cityCtrl,
		});
	}

	protected override initFormControls(): void {
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
}
