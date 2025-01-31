import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfileRouteEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { AuthPageGlobalAbstract } from './auth-page-global.abstract';
import { AuthStepData } from '@shared/models/auth/auth-step-data.model';
import { AbstractControl } from '@angular/forms';

@Directive()
export abstract class AuthProfilePage<T extends { [key: string]: AbstractControl<any, any> }>
	extends AuthPageGlobalAbstract<T>
	implements OnInit
{
	constructor(
		protected _router: Router,
		protected _authStepService: AuthStepService,
	) {
		super();
	}

	ngOnInit(): void {
		this.initFormControls();
		this.initMainForm();
	}

	protected onSubmit<K extends keyof AuthStepData>(
		stepName: K,
		stepValue: AuthStepData[K],
		navitateEndpoint: AuthProfileRouteEnum,
	): void {
		if (this.mainForm.valid) {
			this._authStepService.setStepData(stepName, stepValue);

			this.navigateByUrl(navitateEndpoint);
		}
	}

	protected backToPreviousStep(navitateEndpoint: AuthProfileRouteEnum): void {
		this.navigateByUrl(navitateEndpoint);
	}

	protected abstract initMainForm(): void;

	protected abstract initFormControls(): void;

	private navigateByUrl(navitateEndpoint: AuthProfileRouteEnum): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE + '/' + navitateEndpoint,
		);
	}
}
