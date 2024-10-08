import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { NewUserProfileDatas } from '@shared/models/profile/profile-datas.model';
import { ResponseAddProfile } from '@shared/models/profile/response-add-profile.model';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private readonly _BASE_URL = RouteAPI.PROFILE;

	constructor(private _httpClient: HttpClient) {}

	add(userId: string, profileData: NewUserProfileDatas): Observable<ResponseAddProfile> {
		return this._httpClient
			.post<ResponseAddProfile>(
				`${this._BASE_URL}/add/region/${profileData.regionId}/department/${profileData.departmentId}/city/${profileData.cityId}/user/${userId}`,
				profileData.newProfileData,
			)
			.pipe(tap(res => console.log(res)));
	}
}
