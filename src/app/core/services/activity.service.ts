import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { AuthTokenService } from './auth-token.service';
import { NewActivityInput } from '@shared/models/activity/input/new-activity-input.model';
import { map, Observable } from 'rxjs';
import { ResponseActivity } from '@shared/models/activity/response/response-activity.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { UpdateActivityDetails } from '@shared/models/activity/input/update-activity-details.model';

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

	getActivityById$(activityId: string): Observable<ResponseActivity> {
		return this._httpClient.get<ResponseActivity>(`${this._BASE_URL}/${activityId}`);
	}

	getActivitiesByInterest$ = (interest: string): Observable<ResponseActivity[]> => {
		return this._httpClient.get<ResponseActivity[]>(`${this._BASE_URL}/all`).pipe(
			map(activities =>
				activities.filter(activity =>
					activity.categories.results.some((result: ResponseInterestBase) => {
						const formatResultTitle = result.title
							.replace(/-/g, ' ')
							.split(' ')
							.map((e: string) => e.slice(0, 1).toUpperCase() + e.slice(1).toLowerCase())
							.join(' ');

						return formatResultTitle === interest;
					}),
				),
			),
		);
	};

	addActivity(newActivityInput: NewActivityInput): Observable<ResponseActivity> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.post<ResponseActivity>(
			`${this._BASE_URL}/add/region/${newActivityInput.regionId}/department/${newActivityInput.departmentId}/city/${newActivityInput.cityId}/profile/${userId}`,
			newActivityInput.activityInput,
		);
	}

	updateActivityById(activityId: number, updateActivityInput: UpdateActivityDetails): Observable<ResponseActivity> {
		const userId: string = String(this._authTokenService.getTokenFromLocalStorageAndDecode()?.id);

		return this._httpClient.put<ResponseActivity>(
			`${this._BASE_URL}/update/${activityId.toString()}`,
			updateActivityInput,
		);
	}

	deleteActivityById(activityId: number): Observable<Object> {
		return this._httpClient.delete(`${this._BASE_URL}/delete/${activityId.toString()}`);
	}
}
