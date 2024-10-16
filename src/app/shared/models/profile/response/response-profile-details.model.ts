import { ResponseProfileAddress } from '@shared/models/utils/response-profile-address.model';
import { ResponseProfileName } from '@shared/models/utils/response-profile-name.model';
import { ResponseProfileYear } from '@shared/models/utils/response-profile-year.model';
import { ResponseProfileContact } from '@shared/models/profile/response/response-profile-contact.model';

export class ResponseProfileDetails {
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
	) {}
}
