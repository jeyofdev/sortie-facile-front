import { ResponseAuthSigninBase } from '@shared/models/auth/response-auth-signin-base.model';

export class ResponseAuthSigninError extends ResponseAuthSigninBase {
	constructor(
		public error: true,
		message: string,
	) {
		super(message);
	}
}
