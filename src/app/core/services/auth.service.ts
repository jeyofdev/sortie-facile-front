import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { AuthUserCredential } from '@shared/models/auth/auth-user-credential.model';
import { HttpClient } from '@angular/common/http';
import { ResponseAuthSigninBase } from '@shared/models/auth/response-auth-signin-base.model';
import { ResponseAuthSigninSuccess } from '@shared/models/auth/response-auth-signin-success.model';
import { ResponseAuthSigninError } from '@shared/models/auth/response-auth-signin-error.model';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly _BASE_URL = 'http://localhost:8080/api/v1/auth';

	constructor(private _httpClient: HttpClient) {}

	signInWithEmailAndPassword$(userCredential: AuthUserCredential): Observable<ResponseAuthSigninBase> {
		return this._httpClient.post<ResponseAuthSigninSuccess>(`${this._BASE_URL}/login`, userCredential).pipe(
			catchError(err => {
				const errorMessage = err.error?.message || 'An error occurred while connecting. Please try again.';
				return of(new ResponseAuthSigninError(true, errorMessage));
			}),
		);
	}
}
