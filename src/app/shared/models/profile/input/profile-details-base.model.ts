export class ProfileDetailsBase {
	constructor(
		public firstname: string,
		public lastname: string,
		public dateOfBirth: Date,
		public streetNumber: string,
		public street: string,
		public zipCode: number,
		public phone: string,
		public twitter: string,
		public instagram: string,
		public facebook: string,
		public description: string,
		public avatar: string | null,
	) {}
}
