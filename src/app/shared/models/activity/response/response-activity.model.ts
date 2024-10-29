import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';
import { ResponseActivityDetails } from './response-activity-details.model';
import { ResponseActivityAge } from '@shared/models/utils/response-profile-age.model';
import { ResponseActivityLocation } from '@shared/models/utils/response-activity-location.model';

export class ResponseActivity extends ResponseActivityDetails {
	constructor(
		public override id: number,
		public override name: string,
		public override createdDate: Date,
		public override age: ResponseActivityAge,
		public override imgUrl: string,
		public override link: string,
		public override description: string,
		public override nbGuest: number,
		public override isVisible: boolean,
		public override creatorUserId: number,
		public location: ResponseActivityLocation,
		public categories: CountAndResult<ResponseInterestBase>,
		public bookings: CountAndResult<any>, // TODO,
	) {
		super(id, name, createdDate, age, imgUrl, link, description, nbGuest, isVisible, creatorUserId);
	}
}
