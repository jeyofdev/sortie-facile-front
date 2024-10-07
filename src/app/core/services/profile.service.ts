import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProfileDatas } from '@shared/models/profile/profile-datas.model';
import { ResponseAddProfile } from '@shared/models/profile/response-add-profile.model';
import { Observable, tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class ProfileService {
	private readonly _BASE_URL = 'http://localhost:8080/api/v1/profile';

	constructor(private _httpClient: HttpClient) {}

	add(userId: string, profileData: ProfileDatas): Observable<ResponseAddProfile> {
		return this._httpClient
			.post<ResponseAddProfile>(
				`${this._BASE_URL}/add/region/1/department/1/city/1/user/${userId}`,
				profileData.newProfileData,
			)
			.pipe(tap(res => console.log(res)));
	}
}
