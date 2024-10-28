import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddressService } from '@services/address.service';
import { ProfileService } from '@services/profile.service';
import { AccountSettingsPageAbstract } from '@shared/abstract/account-settings-page.abstract';
import { City } from '@shared/models/address/city.model';
import { Department } from '@shared/models/address/department.model';
import { Region } from '@shared/models/address/region.model';
import { UpdateProfileInput } from '@shared/models/profile/input/update-profile-input.model';
import { FormAccountAddress } from '@shared/types/form/form-account-address.type';
import { RegexHelper } from '@shared/utils/regex.helper';
import { validationAccountMessages } from '@shared/validations/messages/account-settings-message.error';
import { MessageService } from 'primeng/api';
import { Observable, of, switchMap, tap } from 'rxjs';

@Component({
	selector: 'app-settings-address-form',
	templateUrl: './settings-address-form.component.html',
	styleUrl: './settings-address-form.component.scss',
})
export class SettingsAddressFormComponent extends AccountSettingsPageAbstract<FormAccountAddress> implements OnInit {
	@Input() isViewDatas!: boolean;

	streetNumberCtrl!: FormControl<string>;
	streetCtrl!: FormControl<string>;
	regionCtrl!: FormControl<number>;
	departmentCtrl!: FormControl<number>;
	cityCtrl!: FormControl<number>;
	zipCode!: number;

	regionItems$: Observable<Region[]> = of([]);
	departmentItems$: Observable<Department[]> = of([]);
	cityItems$: Observable<City[]> = of([]);

	selectedRegion$!: Observable<Region | null>;
	selectedDepartment$!: Observable<Department | null>;
	selectedCity$!: Observable<City | null>;

	constructor(
		protected override _activatedRoute: ActivatedRoute,
		private _formBuilder: FormBuilder,
		private _addressService: AddressService,
		private _profileService: ProfileService,
		private messageService: MessageService,
	) {
		super(_activatedRoute);
	}

	override ngOnInit(): void {
		this.regionItems$ = this._addressService.getAllRegions();
		this.validationMessages = validationAccountMessages;

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
				this.mainForm.value.streetNumber as string,
				this.mainForm.value.street as string,
				Number(this.resolvedProfile.address.zipCode),
				this.resolvedProfile.contact.phone.split('-').join(''),
				this.resolvedProfile.contact.socialMedia.twitter,
				this.resolvedProfile.contact.socialMedia.instagram,
				this.resolvedProfile.contact.socialMedia.facebook,
				this.resolvedProfile.description,
				this.resolvedProfile.avatar,
				this.resolvedProfile.activities.results.map((activity: any) => activity.id),
				this.mainForm.value.region as number,
				this.mainForm.value.department as number,
				this.mainForm.value.city as number,
			);

			this._profileService
				.updateById(updatedProfile)
				.pipe(
					tap(() => this.showToast()),
					switchMap(() => this._profileService.getById()),
					tap(updatedProfile => {
						this.resolvedProfile = updatedProfile;
					}),
				)
				.subscribe();
		} else {
			this.formError = 'The form contains errors. Please verify your information.';
		}
	}

	showToast() {
		this.messageService.add({
			severity: 'success',
			detail: 'Profil information has been saved successfully.',
			icon: 'pi pi-check',
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

	onCitySelected(city: City): void {
		this.zipCode = Number(city.zipCode);
	}

	protected override initMainForm() {
		this.mainForm = this._formBuilder.group({
			streetNumber: this.streetNumberCtrl,
			street: this.streetCtrl,
			region: this.regionCtrl,
			department: this.departmentCtrl,
			city: this.cityCtrl,
		});
	}

	protected override initFormControls(): void {
		this.streetNumberCtrl = this._formBuilder.control(this.resolvedProfile.address.streetNumber, {
			validators: [Validators.required, Validators.pattern(RegexHelper.streetNumber)],
			nonNullable: true,
		});
		this.streetCtrl = this._formBuilder.control(this.resolvedProfile.address.street, {
			validators: [Validators.required, Validators.maxLength(80)],
			nonNullable: true,
		});
		this.regionCtrl = this._formBuilder.control(this.resolvedProfile.address.region.id, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.departmentCtrl = this._formBuilder.control(this.resolvedProfile.address.department.id, {
			validators: [Validators.required],
			nonNullable: true,
		});
		this.cityCtrl = this._formBuilder.control(this.resolvedProfile.address.city.id, {
			validators: [Validators.required],
			nonNullable: true,
		});
	}
}
