import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { Interest } from '@shared/models/interests.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class InterestService {
	private readonly _BASE_URL = RouteAPI.CATEGORY;

	constructor(private _httpClient: HttpClient) {}

	getAllInterests(): Observable<Interest[]> {
		return this._httpClient.get<Interest[]>(`${this._BASE_URL}/all`);
	}
}
