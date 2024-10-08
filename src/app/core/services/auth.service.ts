import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthUserCredential } from '@shared/models/auth/auth-user-credential.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';
import { ResponseAuthError } from '@shared/models/auth/response-auth-error.model';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenResponse } from '@shared/models/auth/auth-token-response.model';
import { AuthUserRegister } from '@shared/models/auth/auth-user-register.model';
import { ProfileService } from './profile.service';
import { NewUserProfileDatas } from '@shared/models/profile/profile-datas.model';
import { ResponseAuthSignup } from '@shared/models/auth/response-auth-signup.model';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { ResponseAddProfile } from '@shared/models/profile/response-add-profile.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _BASE_URL = RouteAPI.AUTH;

	constructor(
		private _httpClient: HttpClient,
		private _authTokenService: AuthTokenService,
		private _profileService: ProfileService,
	) {}

	signInWithEmailAndPassword$(userCredential: AuthUserCredential): Observable<ResponseAuthBase> {
		this._authTokenService.resetAuthToken();

		return this._httpClient.post<AuthTokenResponse>(`${this._BASE_URL}/login`, userCredential).pipe(
			map((authToken: AuthTokenResponse) => {
				this._authTokenService.updateAuthToken(authToken);
				return new ResponseAuthBase('Authentication successful');
			}),
			catchError(err => this.handleError(err)),
		);
	}

	signUpWithEmailAndPassword(
		userRegisterDatas: AuthUserRegister,
		newUserprofileDatas: NewUserProfileDatas,
	): Observable<ResponseAddProfile | ResponseAuthError> {
		return this._httpClient.post<ResponseAuthSignup>(`${this._BASE_URL}/register`, userRegisterDatas).pipe(
			switchMap((registerUserResponse: ResponseAuthSignup) => {
				return this._profileService.add(registerUserResponse.userId, newUserprofileDatas);
			}),
			catchError(err => this.handleError(err)),
		);
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
			.post<ResponseAuthBase>(`${this._BASE_URL}/update-password?resetToken=${resetToken}`, body.toString(), {
				headers,
			})
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

	private handleError(err: any): Observable<ResponseAuthError> {
		const errorMessage = err.error?.message || 'No token was found in the URL or account already verified.';
		return of(new ResponseAuthError(true, errorMessage));
	}
}
