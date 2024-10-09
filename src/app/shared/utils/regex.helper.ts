export class RegexHelper {
	static email: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	static streetNumber: RegExp = /^\d{1,4}$/;
	static phone = /^(0[1-9])(-\d{2}){4}$/;
	static dateOfBirth = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
}
