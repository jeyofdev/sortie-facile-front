import { Directive, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { AuthPageGlobalAbstract } from './auth-page-global.abstract';
import { AuthStepData } from '@shared/models/auth/auth-step-data.model';

@Directive()
export abstract class AuthProfilePage extends AuthPageGlobalAbstract implements OnInit {
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
		navitateEndpoint: AuthProfileEnum,
	): void {
		console.log('Form Value:', this.mainForm.value);
		console.log('Form Value:', this.mainForm);

		if (this.mainForm.valid) {
			this._authStepService.setStepData(stepName, stepValue);
			console.log(this._authStepService.getAllData());

			this.navigateByUrl(navitateEndpoint);
		}
	}

	protected backToPreviousStep(navitateEndpoint: AuthProfileEnum): void {
		this.navigateByUrl(navitateEndpoint);
	}

	protected abstract initMainForm(): void;

	protected abstract initFormControls(): void;

	private navigateByUrl(navitateEndpoint: AuthProfileEnum): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE + '/' + navitateEndpoint,
		);
	}
}
