import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Interest } from '@shared/models/interests.interface';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class InterestService {
	private readonly _BASE_URL = 'http://localhost:8080/api/v1/category';

	constructor(private _httpClient: HttpClient) {}

	getAllInterests(): Observable<Interest[]> {
		return this._httpClient.get<Interest[]>(`${this._BASE_URL}/all`);
	}
}
