import { AddressBlocItem } from '@shared/models/address/address-bloc-item.model';

export class DepartmentBase extends AddressBlocItem {
	constructor(
		public override id: number,
		public override name: string,
		public number: string,
	) {
		super(id, name);
	}
}
