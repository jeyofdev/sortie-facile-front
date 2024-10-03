export class City {
	constructor(
		public id: number,
		public name: string,
		public zipCode: string,
		public activityIds: Object, // todo model
		public departmentId: number,
	) {}
}
