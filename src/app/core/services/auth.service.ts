import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthUserCredential } from '@shared/models/auth/auth-user-credential.model';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseError } from '@shared/models/auth/response-auth-error.model';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenResponse } from '@shared/models/auth/auth-token-response.model';
import { AuthUserRegister } from '@shared/models/auth/auth-user-register.model';
import { ProfileService } from './profile.service';
import { ResponseAuthSignup } from '@shared/models/auth/response-auth-signup.model';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { ResponseProfile } from '@shared/models/profile/response/response-profile.model';
import { AuthUtils } from '@shared/utils/auth-utils';
import { LocalStorageService } from './local-storage.service';
import { Router } from '@angular/router';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
import { NewProfileInput } from '@shared/models/profile/input/new-profil-input.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends AuthUtils {
	private readonly _BASE_URL = RouteAPI.AUTH;

	private _httpErrorSubject$: BehaviorSubject<HttpErrorResponse> = new BehaviorSubject(new HttpErrorResponse({}));

	private _httpSuccessSubject$: BehaviorSubject<HttpResponse<any>> = new BehaviorSubject(new HttpResponse({}));

	constructor(
		protected override localStorageService: LocalStorageService,
		private _httpClient: HttpClient,
		private _authTokenService: AuthTokenService,
		private _profileService: ProfileService,
		private _router: Router,
	) {
		super(localStorageService);
	}

	signInWithEmailAndPassword$(userCredential: AuthUserCredential): Observable<ResponseAuthBase> {
		this._authTokenService.resetAuthToken();

		return this._httpClient.post<AuthTokenResponse>(`${this._BASE_URL}/login`, userCredential).pipe(
			map((authToken: AuthTokenResponse) => {
				this._authTokenService.updateAuthToken(authToken);
				this.notifyLoggedInStatus(true);

				return new ResponseAuthBase('Authentication successful');
			}),
			catchError(err => this.handleError(err)),
		);
	}

	signUpWithEmailAndPassword(
		userRegisterDatas: AuthUserRegister,
		newProfileInput: NewProfileInput,
	): Observable<ResponseProfile | ResponseError> {
		return this._httpClient.post<ResponseAuthSignup>(`${this._BASE_URL}/register`, userRegisterDatas).pipe(
			switchMap((registerUserResponse: ResponseAuthSignup) => {
				return this._profileService.add(registerUserResponse.userId, newProfileInput);
			}),
			catchError(err => this.handleError(err)),
		);
	}

	logout(): void {
		this._authTokenService.resetAuthToken();
		this.notifyLoggedInStatus(false);
		this._router.navigateByUrl(PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN);
	}

	requestForgotPassword(email: string): Observable<ResponseAuthBase> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		const body = new URLSearchParams();
		body.set('email', email);

		return this._httpClient
			.post<ResponseAuthBase>(`${this._BASE_URL}/forgot-password`, body.toString(), { headers })
			.pipe(catchError(err => this.handleError(err)));
	}

	resetPassword(resetToken: string, newPassword: string): Observable<ResponseAuthBase> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		const body = new URLSearchParams();
		body.set('newPassword', newPassword);

		return this._httpClient
			.post<ResponseAuthBase>(`${this._BASE_URL}/reset-password?resetToken=${resetToken}`, body.toString(), {
				headers,
			})
			.pipe(catchError(err => this.handleError(err)));
	}

	updatePassword(oldPassword: string, newPassword: string): Observable<ResponseAuthBase> {
		const body = { oldPassword, newPassword };

		return this._httpClient
			.post<ResponseAuthBase>(`${this._BASE_URL}/update-password`, body)
			.pipe(catchError(err => this.handleError(err)));
	}

	verificationAccount(verificationToken: string): Observable<ResponseAuthBase> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

		return this._httpClient
			.get<ResponseAuthBase>(`${this._BASE_URL}/verification-account?verificationToken=${verificationToken}`, {
				headers,
			})
			.pipe(catchError(err => this.handleError(err)));
	}

	private handleError(err: any): Observable<ResponseError> {
		const errorMessage = err.message || 'No token was found in the URL or account already verified.';
		return of(new ResponseError(true, errorMessage));
	}

	setHttpSuccessSubject$(success: HttpResponse<any>): void {
		// On retire l'erreur stockée dans le ErrorSubject
		this._httpErrorSubject$.next(new HttpErrorResponse({}));
		// On ajoute l'erreur au SuccessSubject
		this._httpSuccessSubject$.next(success);
	}

	setHttpErrorSubject$(error: HttpErrorResponse): void {
		// On retire l'erreur stockée dans le SuccessSubject
		this._httpSuccessSubject$.next(new HttpResponse({}));
		// On ajoute l'erreur au ErrorSubject
		this._httpErrorSubject$.next(error);
	}
}
