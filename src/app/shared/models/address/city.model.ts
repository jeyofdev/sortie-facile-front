import { CityBase } from '@shared/models/address/city-base.model';

export class City extends CityBase {
	constructor(
		public override id: number,
		public override name: string,
		public override zipCode: string,
		public activityIds: Object, // todo model
		public departmentId: number,
	) {
		super(id, name, zipCode);
	}
}
