import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InterestService } from '@services/interests.service';
import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { ResponseInterestWithDisabled } from '@shared/models/interests/response/response-interests-with-disabled.interface';
import { ResponseInterest } from '@shared/models/interests/response/response-interests.interface';
import { MessageService } from 'primeng/api';
import { first, map } from 'rxjs';

@Component({
	selector: 'app-account-settings-interests-page',
	templateUrl: './account-settings-interests-page.component.html',
	styleUrl: './account-settings-interests-page.component.scss',
	providers: [MessageService],
})
export class AccountSettingsInterestsPageComponent {
	userInterests!: CountAndResult<ResponseInterestBase>;
	choicesInterestList!: ResponseInterestWithDisabled[];

	constructor(
		protected _activatedRoute: ActivatedRoute,
		private _interestService: InterestService,
	) {}

	ngOnInit(): void {
		this._activatedRoute.parent?.data.pipe(first()).subscribe(data => {
			this.userInterests = data['profile']?.categories;
		});

		this._interestService
			.getAllInterests()
			.pipe(
				map((interestList: ResponseInterest[]) => {
					this.choicesInterestList = interestList.map(
						interest =>
							new ResponseInterestWithDisabled(
								interest.id,
								interest.title,
								interest.imgUrl,
								interest.activityIds,
								this.userInterests.results.map(item => item.id).includes(interest.id),
							),
					);
				}),
			)
			.subscribe();
	}

	addInterest(interestChoice: ResponseInterestWithDisabled) {
		const isAlreadyInUserInterests = this.userInterests.results.some(interest => interest.id === interestChoice.id);

		if (!isAlreadyInUserInterests) {
			this.userInterests.results.push(interestChoice);
			interestChoice.disabled = true;
		}
	}
}
