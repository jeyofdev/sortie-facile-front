import { DepartmentBase } from '@shared/models/address/department-base.model';

export class Department extends DepartmentBase {
	constructor(
		public override id: number,
		public override name: string,
		public override number: string,
		public activityIds: Object, // todo model
		public regionId: number, // todo model
		public cityIds: Object, // todo model
	) {
		super(id, name, number);
	}
}
