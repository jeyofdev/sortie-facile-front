import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthService } from '@services/auth.service';
import { InterestService } from '@services/interests.service';
import { AuthPageGlobalAbstract } from '@shared/abstract/auth-page-global.abstract';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { StepAuthProfileInterests } from '@shared/models/auth/steps/step-auth-profile-interests.model';
import { Interest } from '@shared/models/interests.interface';
import { NewProfileData } from '@shared/models/profile/new-profile-data.model';
import { NewUserProfileDatas } from '@shared/models/profile/profile-datas.model';
import { ValidationMessage } from '@shared/types/validation-message.type';
import { validationAuthProfileMessages } from '@shared/validations/messages/auth-profile-message.error';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-interests-page',
	templateUrl: './interests-page.component.html',
	styleUrl: './interests-page.component.scss',
})
export class InterestsPageComponent extends AuthPageGlobalAbstract<never> implements OnInit {
	interestList$!: Observable<Interest[]>;
	selectedInterestIds: number[] = [];
	error!: string;

	constructor(
		private _router: Router,
		private _interestService: InterestService,
		private _authStepService: AuthStepService,
		private _authService: AuthService,
	) {
		super();
	}

	ngOnInit(): void {
		this.interestList$ = this._interestService.getAllInterests();
		this.validationMessages = validationAuthProfileMessages;
	}

	onInterestClick(interestId: number): void {
		this.checkIfInterestIsPresentInSelectedInterestIds(interestId);
	}

	onSubmit(): void {
		this._authStepService.setStepData('step6', new StepAuthProfileInterests(this.selectedInterestIds));
		console.log(this._authStepService.getAllData());
		this.error = '';

		if (this.selectedInterestIds.length > 0) {
			this._authService.signUpWithEmailAndPassword$(
				this._authStepService.getStepData('step1'),
				new NewUserProfileDatas(
					this._authStepService.getStepData('step3').regionId,
					this._authStepService.getStepData('step3').departmentId,
					this._authStepService.getStepData('step3').cityId,
					new NewProfileData(
						this._authStepService.getStepData('step2').firstName,
						this._authStepService.getStepData('step2').lastName,
						new Date(this._authStepService.getStepData('step2').dateOfBirth),
						this._authStepService.getStepData('step3').streetNumber,
						this._authStepService.getStepData('step3').street,
						this._authStepService.getStepData('step3').zipCode,
						this._authStepService.getStepData('step4').phone.split('-').join(''),
						this._authStepService.getStepData('step4').twitter,
						this._authStepService.getStepData('step4').instagram,
						this._authStepService.getStepData('step4').facebook,
						this._authStepService.getStepData('step5').description,
						null,
						this._authStepService.getStepData('step6').interestsIds,
					),
				),
			);
		} else {
			this.error = (this.getValidationMessages('interests') as ValidationMessage)['required'];
		}

		this.navigateByUrl(AuthProfileEnum.INTERESTS);
	}

	backToPreviousStep(): void {
		this.navigateByUrl(AuthProfileEnum.DESCRIPTION);
	}

	private navigateByUrl(navitateEndpoint: AuthProfileEnum): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE + '/' + navitateEndpoint,
		);
	}

	private checkIfInterestIsPresentInSelectedInterestIds(interestId: number) {
		if (!this.selectedInterestIds.includes(interestId)) {
			this.selectedInterestIds.push(interestId);
		} else {
			this.selectedInterestIds = this.selectedInterestIds.filter(id => id !== interestId);
		}
	}
}
