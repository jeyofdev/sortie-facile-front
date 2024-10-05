import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthProfileEnum, AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';

@Component({
	selector: 'app-interests-page',
	templateUrl: './interests-page.component.html',
	styleUrl: './interests-page.component.scss',
})
export class InterestsPageComponent implements OnInit {
	descriptionCtrl!: FormControl;

	constructor(private _router: Router) {}

	ngOnInit(): void {}

	onSubmit(): void {
		console.log('ok');
	}

	backToPreviousStep(): void {
		this.navigateByUrl(AuthProfileEnum.DESCRIPTION);
	}

	private navigateByUrl(navitateEndpoint: AuthProfileEnum): void {
		this._router.navigateByUrl(
			PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP + '/' + PrimaryRouteEnum.PROFILE + '/' + navitateEndpoint,
		);
	}
}
