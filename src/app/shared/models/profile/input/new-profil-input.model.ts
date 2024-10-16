import { NewProfileDetails } from '@shared/models/profile/input/new-profile-details.model';

export class NewProfileInput {
	constructor(
		public regionId: number,
		public departmentId: number,
		public cityId: number,
		public ProfileInput: NewProfileDetails,
	) {}
}
