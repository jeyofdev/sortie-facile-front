import { ResponseSocialMedia } from '@shared/models/utils/response-social-media.model';

export class ResponseProfileContact {
	constructor(
		public phone: string,
		public socialMedia: ResponseSocialMedia,
	) {}
}
