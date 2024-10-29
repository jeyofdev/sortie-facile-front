import { NewActivityDetails } from './new-activity-details.model';

export class NewActivityInput {
	constructor(
		public regionId: number,
		public departmentId: number,
		public cityId: number,
		public activityInput: NewActivityDetails,
	) {}
}
