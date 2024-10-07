import { NewProfileData } from './new-profile-data.model';

export class ProfileDatas {
	constructor(
		public regionId: number,
		public departmentId: number,
		public cityId: number,
		public newProfileData: NewProfileData,
	) {}
}
