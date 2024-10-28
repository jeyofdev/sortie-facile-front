import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountRouteEnum, ActivityRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';

@Component({
	selector: 'app-account-activity-home-page',
	templateUrl: './account-activity-home-page.component.html',
	styleUrl: './account-activity-home-page.component.scss',
})
export class AccountActivityHomePageComponent {
	constructor(public _router: Router) {}

	onClick = () => {
		this._router.navigateByUrl(
			PrimaryRouteEnum.ACCOUNT + '/' + AccountRouteEnum.ACTIVITIES + '/' + ActivityRouteEnum.CREATE,
		);
	};
}
