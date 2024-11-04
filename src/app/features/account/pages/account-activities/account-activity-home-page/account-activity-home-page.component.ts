import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountRouteEnum, ActivityRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { CountAndResult } from '@shared/models/count-and-result.model';
import { first, Observable, of } from 'rxjs';

@Component({
	selector: 'app-account-activity-home-page',
	templateUrl: './account-activity-home-page.component.html',
	styleUrl: './account-activity-home-page.component.scss',
})
export class AccountActivityHomePageComponent {
	resolvedActivities$!: Observable<CountAndResult<ResponseActivity>>;
	layout: 'list' | 'grid' = 'list';

	constructor(
		public _router: Router,
		protected _activatedRoute: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this._activatedRoute.data.pipe(first()).subscribe(data => {
			this.resolvedActivities$ = of(data['profile'].activities);
		});
	}

	onClick = () => {
		this._router.navigateByUrl(
			PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES + '/' + ActivityRouteEnum.CREATE,
		);
	};
}
