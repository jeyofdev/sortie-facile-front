import { Injectable } from '@angular/core';
import { AuthRouteEnum, PrimaryRouteEnum } from '@shared/enums/routes.enum';
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
						routerLink: PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNIN,
					},
					{
						label: 'Signup',
						routerLink: PrimaryRouteEnum.AUTH + '/' + AuthRouteEnum.SIGNUP,
					},
				],
			},
		];
	}
}
