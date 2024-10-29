export class ActivityDetailsBase {
	constructor(
		public name: string,
		public date: Date,
		public ageMin: number,
		public ageMax: number,
		public imgUrl: string,
		public link: string,
		public description: string,
		public nbGuest: number,
		public isVisible: boolean,
	) {}
}
