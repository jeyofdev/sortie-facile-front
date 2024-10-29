import { DepartmentBase } from '@shared/models/address/department-base.model';
import { RegionBase } from '@shared/models/address/region-base.model';
import { CityBase } from '@shared/models/address/city-base.model';

export class ResponseActivityLocation {
	constructor(
		public region: RegionBase,
		public department: DepartmentBase,
		public city: CityBase,
	) {}
}
