import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Injectable({
	providedIn: 'root',
})
export class HeaderService {
	public getMiddleHeaderNavItems(): MenuItem[] {
		return [
			{
				items: [
					{
						label: 'Signin',
					},
					{
						label: 'Signup',
					},
				],
			},
		];
	}
}
