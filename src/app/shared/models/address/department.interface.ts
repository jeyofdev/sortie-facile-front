export class Department {
	constructor(
		public id: number,
		public name: string,
		public number: string,
		public activityIds: Object, // todo model
		public regionId: number, // todo model
		public cityIds: Object, // todo model
	) {}
}
