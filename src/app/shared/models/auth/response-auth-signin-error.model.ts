import { ResponseAuthSigninBase } from './response-auth-signin-base.model';

export class ResponseAuthSigninError extends ResponseAuthSigninBase {
	constructor(
		public error: true,
		message: string,
	) {
		super(message);
	}
}
