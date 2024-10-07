import { AddressBlocItem } from '@shared/models/address/address-bloc-item.model';

export class CityBase extends AddressBlocItem {
	constructor(
		public override id: number,
		public override name: string,
		public zipCode: string,
	) {
		super(id, name);
	}
}
