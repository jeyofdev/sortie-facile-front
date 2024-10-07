export class ResponseAddProfile {
	constructor(
		public id: number,
		public email: string,
		public nickname: string | null,
		public name: object, // TODO
		public year: object, // TODO,
		public address: object, // TODO
		public contact: object, // TODO
		public description: string,
		public avatar: string | null,
		public activities: object, // TODO,
		public bookings: object, // TODO,
		public categories: object, // TODO,
	) {}
}
