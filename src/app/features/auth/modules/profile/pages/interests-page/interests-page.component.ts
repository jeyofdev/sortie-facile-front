import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStepService } from '@services/auth-step.service';
import { InterestService } from '@services/interests.service';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
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
	) {}

	ngOnInit(): void {
		this.interestList$ = this._interestService.getAllInterests();
	}

	onInterestClick(interestId: number): void {
		this.checkIfInterestIsPresentInSelectedInterestIds(interestId);
	}

	onSubmit(): void {
		this._authStepService.setStepData('step4', this.selectedInterestIds);
		console.log(this._authStepService.getAllData());

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
