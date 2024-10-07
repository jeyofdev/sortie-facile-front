import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteAPI } from '@shared/enums/route-api.enum';
import { City } from '@shared/models/address/city.model';
import { Department } from '@shared/models/address/department.model';
import { Region } from '@shared/models/address/region.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AddressService {
	private readonly _BASE_URL_REGION = RouteAPI.REGION;
	private readonly _BASE_URL_DEPARTMENT = RouteAPI.DEPARTMENT;
	private readonly _BASE_URL_CITY = RouteAPI.CITY;

	constructor(private _httpClient: HttpClient) {}

	getAllRegions(): Observable<Region[]> {
		return this._httpClient.get<Region[]>(`${this._BASE_URL_REGION}/all`).pipe();
	}

	getDepartmentsByRegion(regionId: number): Observable<Department[]> {
		return this._httpClient.get<Department[]>(`${this._BASE_URL_DEPARTMENT}/all/region/${regionId}`);
	}

	getCitiesByDepartment(departmentId: number): Observable<City[]> {
		return this._httpClient.get<City[]>(`${this._BASE_URL_CITY}/all/department/${departmentId}`);
	}
}
