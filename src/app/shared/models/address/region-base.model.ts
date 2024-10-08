import { AddressBlocItem } from '@shared/models/address/address-bloc-item.model';

export class RegionBase extends AddressBlocItem {
	constructor(
		public override id: number,
		public override name: string,
	) {
		super(id, name);
	}
}
