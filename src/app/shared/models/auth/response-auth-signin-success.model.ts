import { ResponseAuthSigninBase } from './response-auth-signin-base.model';

export class ResponseAuthSigninSuccess extends ResponseAuthSigninBase {
	constructor(
		public token: string,
		message: string,
	) {
		super(message);
	}
}
