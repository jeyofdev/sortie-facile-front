import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { ResponseInterest } from '@shared/models/interests/response/response-interests.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class InterestService {
	private readonly _BASE_URL = RouteAPI.CATEGORY;

	constructor(private _httpClient: HttpClient) {}

	getAllInterests(): Observable<ResponseInterest[]> {
		return this._httpClient.get<ResponseInterest[]>(`${this._BASE_URL}/all`);
	}
}
