import { Injectable } from '@angular/core';
import { LocalStorageService } from '@services/local-storage.service';
import { AuthTokenInfoResponse } from '@shared/models/auth/auth-token-infos-response.model';
import { AuthTokenResponse } from '@shared/models/auth/auth-token-response.model';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthTokenService {
	/**
	 * save the decoded Token present in Local storage (if there is one).
	 */
	private readonly _tokenDetailsSubject$: BehaviorSubject<AuthTokenInfoResponse | null> =
		new BehaviorSubject<AuthTokenInfoResponse | null>(this.getTokenFromLocalStorageAndDecode());

	constructor(private _localStorageService: LocalStorageService) {}

	/**
	 * get the token stored in localStorage
	 * and return the decoded value of the token (the body of the token)
	 */
	getTokenFromLocalStorageAndDecode(): AuthTokenInfoResponse | null {
		const authToken = this._localStorageService.getAuthToken();

		if (authToken) {
			return this._decodeToken({ token: authToken });
		} else {
			return null;
		}
	}

	/**
	 * expose _tokenDetailsSubject$ as an Observable,
	 * so that every component/service in it .subscribe() is notified if there is a new token.
	 */
	getTokenDetailsSubject$(): Observable<any> {
		return this._tokenDetailsSubject$.asObservable();
	}

	/**
	 * update the decoded token from localStorage
	 */
	updateAuthToken(tokenFromDB: AuthTokenResponse): void {
		this._clearLocalStorageAndUpdateAuthToken(tokenFromDB);
		const decodeToken = this._decodeToken(tokenFromDB);
		this._setTokenDetailsSubject$(decodeToken);
	}

	/**
	 * clear the decoded Token
	 */
	resetAuthToken(): void {
		this._localStorageService.clearAuthToken();
		this._tokenDetailsSubject$.next(null);
	}

	/**
	 * decode auth token (like jwt.io does) in order to extract the BODY and recover the CLAIMS
	 */
	private _decodeToken(tokenFromDB: AuthTokenResponse): AuthTokenInfoResponse {
		return this._getDecodedAuthTokenResponse(tokenFromDB.token);
	}

	/**
	 * decode the auth token
	 */
	private _getDecodedAuthTokenResponse(authToken: string): AuthTokenInfoResponse {
		return jwtDecode(authToken);
	}

	/**
	 * delete user auth token in local storage
	 * and save save new user auth token to local storage
	 */
	private _clearLocalStorageAndUpdateAuthToken(tokenFromDB: AuthTokenResponse): void {
		this._localStorageService.clearAuthToken();
		this._localStorageService.setAuthToken(tokenFromDB);
	}

	/**
	 * expose the tokenDetailsSubject as an observable,
	 * so that each component/service that subscribes to it
	 * will be notified if there is a new token.
	 */
	private _setTokenDetailsSubject$(tokenInfos: AuthTokenInfoResponse): void {
		this._tokenDetailsSubject$.next(tokenInfos);
	}
}
