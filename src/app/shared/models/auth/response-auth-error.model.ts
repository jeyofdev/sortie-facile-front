import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';

export class ResponseError extends ResponseAuthBase {
	constructor(
		public error: true,
		message: string,
	) {
		super(message);
	}
}
