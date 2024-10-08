import { CountAndResult } from '@shared/models/count-and-result.model';
import { ResponseProfileAddress } from '@shared/models/utils/response-profile-address.model';
import { ResponseProfileName } from '@shared/models/utils/response-profile-name.model';
import { ResponseProfileYear } from '@shared/models/utils/response-profile-year.model';
import { ResponseProfileContact } from '@shared/models/profile/response-profile-contact.model';

export class ResponseAddProfile {
	constructor(
		public id: number,
		public email: string,
		public nickname: string | null,
		public name: ResponseProfileName,
		public year: ResponseProfileYear,
		public address: ResponseProfileAddress,
		public contact: ResponseProfileContact,
		public description: string,
		public avatar: string | null,
		public activities: CountAndResult<any>, // TODO,
		public bookings: CountAndResult<any>, // TODO,
		public categories: CountAndResult<any>, // TODO,
	) {}
}
