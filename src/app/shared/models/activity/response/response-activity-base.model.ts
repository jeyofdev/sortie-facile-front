import { ResponseActivityAge } from '@shared/models/utils/response-profile-age.model';

export class ResponseActivityBase {
	constructor(
		public id: number,
		public name: string,
		public createdDate: Date,
		public age: ResponseActivityAge,
		public imgUrl: string,
		public link: string,
		public description: string,
		public nbGuest: number,
		public isVisible: boolean,
	) {}
}
