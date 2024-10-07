import { NewProfileData } from '@shared/models/profile/new-profile-data.model';

export class NewUserProfileDatas {
	constructor(
		public regionId: number,
		public departmentId: number,
		public cityId: number,
		public newProfileData: NewProfileData,
	) {}
}
