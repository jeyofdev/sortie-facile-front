import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterestService } from '@services/interests.service';
import { ProfileService } from '@services/profile.service';
import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { ResponseInterestWithDisabled } from '@shared/models/interests/response/response-interests-with-disabled.interface';
import { ResponseInterest } from '@shared/models/interests/response/response-interests.interface';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, first, map } from 'rxjs';

@Component({
	selector: 'app-account-settings-interests-page',
	templateUrl: './account-settings-interests-page.component.html',
	styleUrl: './account-settings-interests-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsInterestsPageComponent {
	private _userInterestsSubject = new BehaviorSubject<CountAndResult<ResponseInterestBase> | null>(null);
	userInterests$ = this._userInterestsSubject.asObservable();

	private _choicesInterestListSubject = new BehaviorSubject<ResponseInterestWithDisabled[]>([]);
	choicesInterestList$ = this._choicesInterestListSubject.asObservable();

	constructor(
		protected _activatedRoute: ActivatedRoute,
		private _interestService: InterestService,
		private _profileService: ProfileService,
	) {}

	ngOnInit(): void {
		this._activatedRoute.parent?.data.pipe(first()).subscribe(data => {
			this._userInterestsSubject.next(data['profile']?.categories);
		});

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
								this._userInterestsSubject
									.getValue()
									?.results.map(item => item.id)
									.includes(interest.id) as boolean,
							),
					);

					this._choicesInterestListSubject.next(choices);
				}),
			)
			.subscribe();
	}

	addInterest(interestChoice: ResponseInterestWithDisabled) {
		const isAlreadyInUserInterests = this._userInterestsSubject
			.getValue()
			?.results.some(interest => interest.id === interestChoice.id);

		if (!isAlreadyInUserInterests) {
			this._profileService.addOneInterest(interestChoice.id).subscribe({
				next: () => {
					const currentUserInterests = this._userInterestsSubject.getValue();

					if (currentUserInterests) {
						currentUserInterests.results.push(interestChoice);
						this._userInterestsSubject.next(currentUserInterests);
					}

					interestChoice.disabled = true;
				},
			});
		}
	}

	removeInterest(interestId: number) {
		this._profileService.removeOneInterest(interestId).subscribe({
			next: () => {
				const currentUserInterests = this._userInterestsSubject.getValue();

				if (currentUserInterests) {
					currentUserInterests.results = currentUserInterests.results.filter(
						interest => interest.id !== Number(interestId),
					);

					this._userInterestsSubject.next(currentUserInterests);
				}

				const interestToReactivate = this._choicesInterestListSubject
					.getValue()
					.find(interest => interest.id === interestId);
				if (interestToReactivate) {
					interestToReactivate.disabled = false;
				}
			},
		});
	}
}
