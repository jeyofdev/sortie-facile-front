import { RegionBase } from '@shared/models/address/region-base.model';

export class Region extends RegionBase {
	constructor(
		public override id: number,
		public override name: string,
		public departmentIds: Object, // todo model
		public activityIds: Object, // todo model
	) {
		super(id, name);
	}
}
