export class StepAuthProfileAddress {
	constructor(
		public streetNumber: string,
		public street: string,
		public regionId: number,
		public departmentId: number,
		public zipCode: number,
		public cityId: number,
	) {}
}
