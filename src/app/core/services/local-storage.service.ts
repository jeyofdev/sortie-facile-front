import { Injectable } from '@angular/core';
import { AuthTokenResponse } from '@shared/models/auth/auth-token-response.model';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageService {
	/**
	 * save user login token to local storage
	 */
	setAuthToken(authTokenResponse: AuthTokenResponse): void {
		localStorage.setItem('authToken', authTokenResponse.token);
	}

	/**
	 * get user login token from local storage
	 */
	getAuthToken(): string | null {
		const authToken = localStorage.getItem('authToken');

		if (authToken) {
			return authToken;
		} else {
			return null;
		}
	}

	/**
	 * delete user login token in local storage
	 */
	clearAuthToken(): void {
		localStorage.removeItem('authToken');
	}
}
