export class StepAuthProfileAddress {
	constructor(
		public streetNumber: number,
		public street: string,
		public regionId: number,
		public departmentId: number,
		public cityId: number,
	) {}
}
