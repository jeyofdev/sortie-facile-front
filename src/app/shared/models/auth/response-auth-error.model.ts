import { ResponseAuthBase } from '@shared/models/auth/response-auth-base.model';

export class ResponseAuthError extends ResponseAuthBase {
	constructor(
		public error: true,
		message: string,
	) {
		super(message);
	}
}
