import { AuthUserDataBase } from '@shared/models/auth/auth-user-data-base.model';

export class AuthUserCredential extends AuthUserDataBase {
	constructor(
		public override email: string,
		public override password: string,
	) {
		super(email, password);
	}
}
