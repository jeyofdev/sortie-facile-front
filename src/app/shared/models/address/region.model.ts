export class Region {
	constructor(
		public id: number,
		public name: string,
		public departmentIds: Object, // todo model
		public activityIds: Object, // todo model
	) {}
}
