import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseAuthError } from '@shared/models/auth/response-auth-error.model';
import { tap } from 'rxjs';

@Component({
	selector: 'app-verification-account-page',
	templateUrl: './verification-account-page.component.html',
	styleUrl: './verification-account-page.component.scss',
})
export class VerificationAccountPageComponent implements OnInit {
	continueLink!: string;
	verificationToken: string | null = null;
	error!: string;
	success!: string;

	constructor(
		private _route: ActivatedRoute,
		private _authService: AuthService,
	) {}

	ngOnInit(): void {
		this.continueLink = '/' + PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN;

		this._route.queryParams.subscribe(params => {
			this.verificationToken = params['verificationToken'];
		});

		if (this.verificationToken) {
			this._authService
				.verificationAccount(this.verificationToken)
				.pipe(
					tap((res: ResponseAuthBase) => {
						if (res instanceof ResponseAuthError) {
							this.error = res.message;
						} else {
							this.success = res.message;
						}
					}),
				)
				.subscribe();
		} else {
			this.error = 'No token was found in the URL. Please provide a valid token.';
		}
	}

	onClick(): void {
		console.log('onClicked');
		// TODO redirect to dashboard
	}
}
