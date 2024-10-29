import { ActivityDetailsBase } from './activity-details-base.model';

export class NewActivityDetails extends ActivityDetailsBase {
	constructor(
		public override name: string,
		public override date: Date,
		public override ageMin: number,
		public override ageMax: number,
		public override imgUrl: string,
		public override link: string,
		public override description: string,
		public override nbGuest: number,
		public override isVisible: boolean,
		public categoryIds: number[],
	) {
		super(name, date, ageMin, ageMax, imgUrl, link, description, nbGuest, isVisible);
	}
}
