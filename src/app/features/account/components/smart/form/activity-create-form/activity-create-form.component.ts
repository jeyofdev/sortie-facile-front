import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivityService } from '@services/activity.service';
import { AddressService } from '@services/address.service';
import { InterestService } from '@services/interests.service';
import { NotificationService } from '@services/notification.service';
import { AccountActivityPageAbstract } from '@shared/abstract/account-activity-page.abstract';
import { AccountRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { NewActivityDetails } from '@shared/models/activity/input/new-activity-details.model';
import { NewActivityInput } from '@shared/models/activity/input/new-activity-input.model';
import { City } from '@shared/models/address/city.model';
import { Department } from '@shared/models/address/department.model';
import { Region } from '@shared/models/address/region.model';
import { ResponseInterestWithDisabled } from '@shared/models/interests/response/response-interests-with-disabled.interface';
import { ResponseInterest } from '@shared/models/interests/response/response-interests.interface';
import { FormAccountActivityAddress } from '@shared/types/form/form-account-activity-address.type';
import { FormAccountCreateActivity } from '@shared/types/form/form-account-create-activity.type';
import { FormYearOld } from '@shared/types/form/form-year-old.type';
import { validationAccountCreateActivityMessages } from '@shared/validations/messages/account-create-activity-message.error';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

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

	private _selectedInterestsSubject = new BehaviorSubject<number[]>([]);
	selectedInterests$ = this._selectedInterestsSubject.asObservable();

	private _choicesInterestListSubject = new BehaviorSubject<ResponseInterestWithDisabled[]>([]);
	choicesInterestList$ = this._choicesInterestListSubject.asObservable();

	constructor(
		private _formBuilder: FormBuilder,
		private _addressService: AddressService,
		private _activityService: ActivityService,
		private _router: Router,
		private _interestService: InterestService,
		private _messageService: MessageService,
		private _notificationService: NotificationService,
	) {
		super();
	}

	override ngOnInit(): void {
		this.regionItems$ = this._addressService.getAllRegions();
		this.validationMessages = validationAccountCreateActivityMessages;

		this._interestService
			.getAllInterests()
			.pipe(
				map((interestList: ResponseInterest[]) => {
					const choices = interestList.map(
						interest =>
							new ResponseInterestWithDisabled(
								interest.id,
								interest.title,
								interest.imgUrl,
								interest.activityIds,
								false,
							),
					);

					this._choicesInterestListSubject.next(choices);
				}),
			)
			.subscribe();

		super.ngOnInit();
	}

	onSubmit(): void {
		this.formError = '';

		if (this.mainForm.valid) {
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
							'',
							this.mainForm.value.link as string,
							this.mainForm.value.description as string,
							this.mainForm.value.participant as number,
							true,
							this._selectedInterestsSubject.getValue(),
						),
					),
				)
				.pipe(
					tap(() => {
						this._notificationService.showSuccess('Activity added successfully !');
						this._router.navigateByUrl('/' + PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES);
					}),
				)
				.subscribe();
		} else {
			this.formError = 'The form contains errors. Please verify your information.';
		}
	}

	addInterest(interestChoice: ResponseInterestWithDisabled) {
		const currentInterests = this._selectedInterestsSubject.getValue();
		const isAlreadyInUserInterests = currentInterests.includes(interestChoice.id);

		const updatedInterests = isAlreadyInUserInterests
			? currentInterests.filter(id => id !== interestChoice.id)
			: [...currentInterests, interestChoice.id];

		this._selectedInterestsSubject.next(updatedInterests);

		const updatedChoices = this._choicesInterestListSubject.getValue().map(interest => {
			if (interest.id === interestChoice.id) {
				return { ...interest, disabled: !isAlreadyInUserInterests };
			}
			return interest;
		});

		this._choicesInterestListSubject.next(updatedChoices);
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
			validators: [Validators.required, Validators.minLength(5), Validators.maxLength(200)],
			nonNullable: true,
		});
		this.descriptionCtrl = this._formBuilder.control('', {
			validators: [Validators.required, Validators.minLength(10)],
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
