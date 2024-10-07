import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { AuthService } from '@services/auth.service';
import { InterestService } from '@services/interests.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { AuthUserRegister } from '@shared/models/auth/auth-user-register.model';
import { StepAuthProfileInterests } from '@shared/models/auth/steps/step-auth-profile-interests.model';
import { Interest } from '@shared/models/interests.interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-interests-page',
	templateUrl: './interests-page.component.html',
	styleUrl: './interests-page.component.scss',
})
export class InterestsPageComponent implements OnInit {
	interestList$!: Observable<Interest[]>;
	selectedInterestIds: number[] = [];

	constructor(
		private _router: Router,
		private _interestService: InterestService,
		private _authStepService: AuthStepService,
		private _authService: AuthService,
	) {}

	ngOnInit(): void {
		this.interestList$ = this._interestService.getAllInterests();
	}

	onInterestClick(interestId: number): void {
		this.checkIfInterestIsPresentInSelectedInterestIds(interestId);
	}

	onSubmit(): void {
		this._authStepService.setStepData('step6', new StepAuthProfileInterests(this.selectedInterestIds));
		console.log(this._authStepService.getAllData());

		this._authService.signUpWithEmailAndPassword$(this._authStepService.getStepData('step1'));

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
