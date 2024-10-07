import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthUserCredential } from '@shared/models/auth/auth-user-credential.model';
import { HttpClient } from '@angular/common/http';
import { ResponseAuthSigninBase } from '@shared/models/auth/response-auth-signin-base.model';
import { ResponseAuthSigninError } from '@shared/models/auth/response-auth-signin-error.model';
import { AuthTokenService } from './auth-token.service';
import { AuthTokenResponse } from '@shared/models/auth/auth-token-response.model';
import { AuthUserRegister } from '@shared/models/auth/auth-user-register.model';
import { ProfileService } from './profile.service';
import { ProfileDatas } from '@shared/models/profile/profile-datas.model';
import { ResponseAuthSignup } from '@shared/models/auth/response-auth-signup.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _BASE_URL = 'http://localhost:8080/api/v1/auth';

	constructor(
		private _httpClient: HttpClient,
		private _authTokenService: AuthTokenService,
		private _profileService: ProfileService,
	) {}

	signInWithEmailAndPassword$(userCredential: AuthUserCredential): Observable<ResponseAuthSigninBase> {
		this._authTokenService.resetAuthToken();

		return this._httpClient.post<AuthTokenResponse>(`${this._BASE_URL}/login`, userCredential).pipe(
			map((authToken: AuthTokenResponse) => {
				this._authTokenService.updateAuthToken(authToken);
				return new ResponseAuthSigninBase('Authentication successful');
			}),
			catchError(err => {
				const errorMessage = err.error?.message || 'An error occurred while connecting. Please try again.';
				return of(new ResponseAuthSigninError(true, errorMessage));
			}),
		);
	}

	signUpWithEmailAndPassword$(userRegisterDatas: AuthUserRegister, profileData: ProfileDatas): void {
		this._httpClient
			.post<ResponseAuthSignup>(`${this._BASE_URL}/register`, userRegisterDatas)
			.pipe(
				switchMap((registerUserResponse: ResponseAuthSignup) => {
					return this._profileService.add(registerUserResponse.userId, profileData);
				}),
			)
			.subscribe();
	}
}
