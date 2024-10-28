import { ProfileDetailsBase } from './profile-details-base.model';

export class UpdateProfileInput extends ProfileDetailsBase {
	constructor(
		public override firstname: string,
		public override lastname: string,
		public override dateOfBirth: Date,
		public override streetNumber: string,
		public override street: string,
		public override zipCode: number,
		public override phone: string,
		public override twitter: string,
		public override instagram: string,
		public override facebook: string,
		public override description: string,
		public override avatar: string | null,
		public categoryIds: number[],
		public regionId: number,
		public departmentId: number,
		public cityId: number,
	) {
		super(
			firstname,
			lastname,
			dateOfBirth,
			streetNumber,
			street,
			zipCode,
			phone,
			twitter,
			instagram,
			facebook,
			description,
			avatar,
		);
	}
}
