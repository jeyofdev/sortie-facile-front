import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressService } from '@services/address.service';
import { AccountActivityPageAbstract } from '@shared/abstract/account-activity-page.abstract';
import { City } from '@shared/models/address/city.model';
import { Department } from '@shared/models/address/department.model';
import { Region } from '@shared/models/address/region.model';
import { FormAccountActivityAddress } from '@shared/types/form/form-account-activity-address.type';
import { FormAccountCreateActivity } from '@shared/types/form/form-account-create-activity.type';
import { FormYearOld } from '@shared/types/form/form-year-old.type';
import { validationAccountCreateActivityMessages } from '@shared/validations/messages/account-create-activity-message.error';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-activity-create-form',
	templateUrl: './activity-create-form.component.html',
	styleUrl: './activity-create-form.component.scss',
})
export class ActivityCreateFormComponent
	extends AccountActivityPageAbstract<FormAccountCreateActivity>
	implements OnInit
{
	yearOldForm!: FormGroup<FormYearOld>;
	addressForm!: FormGroup<FormAccountActivityAddress>;

	titleCtrl!: FormControl<string>;
	descriptionCtrl!: FormControl<string>;
	minAgeCtrl!: FormControl<number>;
	maxAgeCtrl!: FormControl<number>;
	participantCtrl!: FormControl<number>;
	dateCtrl!: FormControl<string>;
	regionCtrl!: FormControl<number>;
	departmentCtrl!: FormControl<number>;
	cityCtrl!: FormControl<number>;
	linkCtrl!: FormControl<string | null>;
	zipCode!: number;

	regionItems$: Observable<Region[]> = of([]);
	departmentItems$: Observable<Department[]> = of([]);
	cityItems$: Observable<City[]> = of([]);

	selectedRegion$!: Observable<Region | null>;
	selectedDepartment$!: Observable<Department | null>;
	selectedCity$!: Observable<City | null>;

	constructor(
		private _formBuilder: FormBuilder,
		private _addressService: AddressService,
	) {
		super();
	}

	override ngOnInit(): void {
		this.regionItems$ = this._addressService.getAllRegions();
		this.validationMessages = validationAccountCreateActivityMessages;

		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';
		console.log(this.mainForm);

		if (this.mainForm.valid) {
			console.log(this.mainForm.value);
		} else {
			this.formError = 'The form contains errors. Please verify your information.';
		}
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

	onCitySelected(city: City): void {
		this.zipCode = Number(city.zipCode);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			title: this.titleCtrl,
			description: this.descriptionCtrl,
			yearOldForm: this.yearOldForm,
			participant: this.participantCtrl,
			date: this.dateCtrl,
			addressForm: this.addressForm,
			link: this.linkCtrl,
		});
	}

	protected override initFormControls(): void {
		this.titleCtrl = this._formBuilder.control('', {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.descriptionCtrl = this._formBuilder.control('', {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.minAgeCtrl = this._formBuilder.control(0, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.maxAgeCtrl = this._formBuilder.control(0, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.participantCtrl = this._formBuilder.control(0, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.dateCtrl = this._formBuilder.control('', {
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
		this.linkCtrl = this._formBuilder.control('');

		this.yearOldForm = this._formBuilder.group({
			minAge: this.minAgeCtrl,
			maxAge: this.maxAgeCtrl,
		});

		this.addressForm = this._formBuilder.group({
			region: this.regionCtrl,
			department: this.departmentCtrl,
			city: this.cityCtrl,
		});
	}
}
