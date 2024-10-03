import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { City } from '@shared/models/address/city.interface';
import { Department } from '@shared/models/address/department.interface';
import { Region } from '@shared/models/address/region.model';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AddressService {
	private readonly _BASE_URL_REGION = 'http://localhost:8080/api/v1/region';
	private readonly _BASE_URL_DEPARTMENT = 'http://localhost:8080/api/v1/department';
	private readonly _BASE_URL_CITY = 'http://localhost:8080/api/v1/city';

	constructor(private _httpClient: HttpClient) {}

	getAllRegions(): Observable<Region[]> {
		return this._httpClient.get<Region[]>(`${this._BASE_URL_REGION}/all`);
	}

	getDepartmentsByRegion(regionId: number): Observable<Department[]> {
		return this._httpClient.get<Department[]>(`${this._BASE_URL_DEPARTMENT}/all/region/${regionId}`);
	}

	getCitiesByDepartment(departmentId: number): Observable<City[]> {
		return this._httpClient.get<City[]>(`${this._BASE_URL_CITY}/all/department/${departmentId}`);
	}
}
