import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { AuthTokenService } from './auth-token.service';
import { NewActivityInput } from '@shared/models/activity/input/new-activity-input.model';
import { Observable } from 'rxjs';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';

@Injectable({
	providedIn: 'root',
})
export class ActivityService {
	private readonly _BASE_URL = RouteAPI.ACTIVITY;

	constructor(
		private _httpClient: HttpClient,
		private _authTokenService: AuthTokenService,
	) {}

	getAllActivities$(): Observable<ResponseActivity[]> {
		return this._httpClient.get<ResponseActivity[]>(`${this._BASE_URL}/all`);
	}

	addCategory(newActivityInput: NewActivityInput): Observable<ResponseActivity> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.post<ResponseActivity>(
			`${this._BASE_URL}/add/region/${newActivityInput.regionId}/department/${newActivityInput.departmentId}/city/${newActivityInput.cityId}/profile/${userId}`,
			newActivityInput.activityInput,
		);
	}
}
