import { Component, OnInit } from '@angular/core';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';

@Component({
	selector: 'app-verified-account-page',
	templateUrl: './verified-account-page.component.html',
	styleUrl: './verified-account-page.component.scss',
})
export class VerifiedAccountPageComponent implements OnInit {
	continueLink!: string;

	ngOnInit(): void {
		this.continueLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
	}

	onClick(): void {
		console.log('onClicked');
		// TODO redirect to dashboard
	}
}
