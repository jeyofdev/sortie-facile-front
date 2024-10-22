import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseProfileAddress } from '@shared/models/utils/response-profile-address.model';
import { ResponseProfileName } from '@shared/models/utils/response-profile-name.model';
import { ResponseProfileYear } from '@shared/models/utils/response-profile-year.model';
import { ResponseProfileContact } from '@shared/models/profile/response/response-profile-contact.model';
import { ResponseProfileDetails } from './response-profile-details.model';
import { ResponseInterestBase } from '@shared/models/interests/response/response-interest-base.model';

export class ResponseProfile extends ResponseProfileDetails {
	constructor(
		public override id: number,
		public override email: string,
		public override nickname: string | null,
		public override name: ResponseProfileName,
		public override year: ResponseProfileYear,
		public override address: ResponseProfileAddress,
		public override contact: ResponseProfileContact,
		public override description: string,
		public override avatar: string | null,
		public activities: CountAndResult<any>, // TODO,
		public bookings: CountAndResult<any>, // TODO,
		public categories: CountAndResult<ResponseInterestBase>,
	) {
		super(id, email, nickname, name, year, address, contact, description, avatar);
	}
}
