import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from '@services/activity.service';
import { AddressService } from '@services/address.service';
import { AccountActivityPageAbstract } from '@shared/abstract/account-activity-page.abstract';
import { AccountRouteEnum, ActivityRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { NewActivityDetails } from '@shared/models/activity/input/new-activity-details.model';
import { NewActivityInput } from '@shared/models/activity/input/new-activity-input.model';
import { City } from '@shared/models/address/city.model';
import { Department } from '@shared/models/address/department.model';
import { Region } from '@shared/models/address/region.model';
import { FormAccountActivityAddress } from '@shared/types/form/form-account-activity-address.type';
import { FormAccountCreateActivity } from '@shared/types/form/form-account-create-activity.type';
import { FormYearOld } from '@shared/types/form/form-year-old.type';
import { validationAccountCreateActivityMessages } from '@shared/validations/messages/account-create-activity-message.error';
import { Observable, of, tap } from 'rxjs';

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
		private _activityService: ActivityService,
		private _router: Router,
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
			this._activityService
				.addCategory(
					new NewActivityInput(
						this.mainForm.value.addressForm?.region as number,
						this.mainForm.value.addressForm?.department as number,
						this.mainForm.value.addressForm?.city as number,
						new NewActivityDetails(
							this.mainForm.value.title as string,
							new Date(this.mainForm.value.date as string),
							this.mainForm.value.yearOldForm?.minAge as number,
							this.mainForm.value.yearOldForm?.maxAge as number,
							'https://images.unsplash.com/photo-1729867302119-0cd9f7dcc9c8?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
							this.mainForm.value.link as string,
							this.mainForm.value.description as string,
							this.mainForm.value.participant as number,
							true,
							[1, 2],
						),
					),
				)
				.pipe(
					tap(() =>
						this._router.navigateByUrl(
							'/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES + '/' + ActivityRouteEnum.CREATE,
						),
					),
				)
				.subscribe();
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
