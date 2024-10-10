import { Component, OnInit } from '@angular/core';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';

@Component({
	selector: 'app-check-email',
	templateUrl: './check-email.component.html',
	styleUrl: './check-email.component.scss',
})
export class CheckEmailComponent implements OnInit {
	redirectLink!: string;
	resendLink!: string;

	ngOnInit(): void {
		this.redirectLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;
		this.resendLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.CHECK_EMAIL;
	}

	onClick(): void {
		console.log('ok');
	}
}
