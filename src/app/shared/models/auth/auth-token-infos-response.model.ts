export class AuthTokenInfoResponse {
	constructor(
		public exp: number,
		public iat: number,
		public id: number,
		public nickname: string,
		public role: string,
		public sub: string,
	) {}
}
