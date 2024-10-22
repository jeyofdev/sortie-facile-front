import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { Observable, of, tap } from 'rxjs';
import { AuthTokenService } from './auth-token.service';
import { NewProfileInput } from '@shared/models/profile/input/new-profil-input.model';
import { UpdateProfileInput } from '@shared/models/profile/input/update-profile-input.model';
import { ResponseProfile } from '@shared/models/profile/response/response-profile.model';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private readonly _BASE_URL = RouteAPI.PROFILE;

	constructor(
		private _httpClient: HttpClient,
		private _authTokenService: AuthTokenService,
	) {}

	add(userId: string, newProfileInput: NewProfileInput): Observable<ResponseProfile> {
		return this._httpClient.post<ResponseProfile>(
			`${this._BASE_URL}/add/region/${newProfileInput.regionId}/department/${newProfileInput.departmentId}/city/${newProfileInput.cityId}/user/${userId}`,
			newProfileInput.ProfileInput,
		);
	}

	updateById(updateProfileInput: UpdateProfileInput): Observable<ResponseProfile> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.put<ResponseProfile>(`${this._BASE_URL}/update/${userId}`, updateProfileInput);
	}

	getById(): Observable<ResponseProfile> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.get<ResponseProfile>(`${this._BASE_URL}/${userId}`);
	}

	addOneInterest(categoryId: number): Observable<ResponseProfile> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.post<ResponseProfile>(`${this._BASE_URL}/${userId}/category/${String(categoryId)}`, {});
	}

	removeOneInterest(categoryId: number): Observable<ResponseProfile> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.put<ResponseProfile>(`${this._BASE_URL}/${userId}/category/${String(categoryId)}`, {});
	}
}
