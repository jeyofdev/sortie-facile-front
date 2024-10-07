export class CountAndResult<T> {
	constructor(
		public count: number,
		public results: T[],
	) {}
}
