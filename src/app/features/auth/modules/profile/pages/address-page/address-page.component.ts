import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressService } from '@services/address.service';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfilePage } from '@shared/abstract/auth-profile-page.abstract';
import { AuthProfileEnum } from '@shared/enums/routes.enum';
import { City } from '@shared/models/address/city.model';
import { Department } from '@shared/models/address/department.model';
import { Region } from '@shared/models/address/region.model';
import { StepAuthProfileAddress } from '@shared/models/auth/steps/step-auth-profile-address.model';
import { FormAddress } from '@shared/types/form/form-address.type';
import { FormStreet } from '@shared/types/form/form-street.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-address-page',
	templateUrl: './address-page.component.html',
	styleUrl: './address-page.component.scss',
})
export class AddressPageComponent extends AuthProfilePage<FormAddress> implements OnInit {
	streetForm!: FormGroup<FormStreet>;

	streetNumberCtrl!: FormControl<string>;
	streetCtrl!: FormControl<string>;
	regionCtrl!: FormControl<number>;
	departmentCtrl!: FormControl<number>;
	cityCtrl!: FormControl<number>;

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

		super.ngOnInit();
	}

	override onSubmit(): void {
		super.onSubmit(
			'step3',
			new StepAuthProfileAddress(
				this.mainForm.value.streetForm?.streetNumber as string,
				this.mainForm.value.streetForm?.street as string,
				this.mainForm.value.region as number,
				this.mainForm.value.department as number,
				this.mainForm.value.city as number,
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
		this.streetNumberCtrl = this._formBuilder.control('', {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.streetCtrl = this._formBuilder.control('', {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.regionCtrl = this._formBuilder.control(0, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.departmentCtrl = this._formBuilder.control(0, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.cityCtrl = this._formBuilder.control(0, {
			validators: [Validators.required],
			nonNullable: true,
		});

		this.streetForm = this._formBuilder.group({
			streetNumber: this.streetNumberCtrl,
			street: this.streetCtrl,
		});
	}
}
