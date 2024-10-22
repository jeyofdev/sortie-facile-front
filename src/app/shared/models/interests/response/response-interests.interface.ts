import { ResponseInterestBase } from './response-interest-base.model';

export class ResponseInterest extends ResponseInterestBase {
	constructor(
		public override id: number,
		public override title: string,
		public imgUrl: string,
		public activityIds: Object, // todo model
	) {
		super(id, title);
	}
}
